import React, { useState, useEffect, useRef } from "react"
import { useSession } from "../context"
import { qAskReplay, invalidations } from "rxq"
import { Subject } from "rxjs"
import { map, tap, withLatestFrom, switchMap, take } from "rxjs/operators"
import withStyles from "react-jss"
import classNames from "classnames"
import * as brandImages from "../resources/images/brands"

const styles = {
	brandDropdown: {
		marginRight: "10px",
	},
	brandDropdown__container: {
		width: "300px",
	},
	brandDropdown__input: {
		width: "90px",
		height: "50px",
		backgroundRepeat: "no-repeat",
		backgroundSize: "140%",
		backgroundPosition: "center",
		backgroundColor: "transparent",
		border: "none",
		opacity: 0.3,
		cursor: "pointer",
		"&:hover": { opacity: 1 },
	},
	brandDropdown__input_selected: { opacity: 1 },
}

export default withStyles(styles)(
	({ field, setSelectedBrand = () => {}, fieldMap, className, classes }) => {
		const {
			rxq: { doc$ },
		} = useSession()[0]

		/** Get brand list */
		const [brandList, setBrandList] = useState([])
		const selectBrand$ = useRef(new Subject()).current
		useEffect(() => {
			const brandListObj$ = doc$.pipe(
				qAskReplay("CreateSessionObject", {
					qInfo: { qType: "listobject" },
					qListObjectDef: {
						qDef: {
							qFieldDefs: [field],
						},
						qInitialDataFetch: [{ qWidth: 1, qHeight: 100 }],
					},
				})
			)

			const brandLayout$ = brandListObj$
				.pipe(
					invalidations(true),
					qAskReplay("GetLayout"),
					map(layout => layout.qListObject.qDataPages[0].qMatrix),
					map(qMatrix =>
						qMatrix.map(row => ({
							code: row[0].qText,
							elemNumber: row[0].qElemNumber,
							selectionState: row[0].qState,
						}))
					),
					map(brandList => {
						if (fieldMap)
							return brandList.map(brand => ({
								...brand,
								code: fieldMap[brand.code],
							}))
						else return brandList
					}),
					tap(brandList => {
						const selectedBrand = brandList.find(
							brand => brand.selectionState === "S"
						)
						if (selectedBrand !== undefined)
							setSelectedBrand(selectedBrand.code)
						else setSelectedBrand(null)
					})
				)
				.subscribe(setBrandList)

			const selectionSub$ = selectBrand$
				.pipe(
					withLatestFrom(brandListObj$),
					switchMap(([brand, brandListObjHandle]) =>
						brandListObjHandle.ask(
							"SelectListObjectValues",
							"/qListObjectDef",
							[brand],
							false
						)
					)
				)
				.subscribe()

			return () => {
				brandListObj$
					.pipe(
						qAskReplay("GetProperties"),
						map(props => props.qInfo.qId),
						switchMap(id => doc$.pipe(qAskReplay("DestroySessionObject", id))),
						take(1)
					)
					.subscribe()
				brandLayout$.unsubscribe()
				selectionSub$.unsubscribe()
			}
		}, [doc$, selectBrand$, field])

		return (
			<div className={classNames(classes.brandDropdown__container, className)}>
				{brandList.map(brand => (
					<input
						type="button"
						key={brand.elemNumber}
						className={classNames(classes.brandDropdown__input, {
							[classes.brandDropdown__input_selected]:
								brand.selectionState === "S",
						})}
						style={{
							backgroundImage: `url(${brandImages[brand.code]})`,
						}}
						onClick={() => selectBrand$.next(brand.elemNumber)}
					/>
				))}
			</div>
		)
	}
)
