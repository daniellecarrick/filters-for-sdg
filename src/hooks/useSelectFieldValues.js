import { useEffect, useRef } from "react"
import { useSession } from "dash-component-library/context"
import { qAskReplay } from "rxq"
import { combineLatest, map, switchMap } from "rxjs/operators"
import { Subject } from "rxjs"

export default ({ field, app }) => {
	const sessions = useSession()
	const {
		rxq: { doc$ },
	} = app ? sessions.find(session => session.name === app) : sessions[0]

	const select$ = useRef(new Subject()).current

	useEffect(() => {
		const field$ = doc$.pipe(qAskReplay("GetField", field))

		const sub$ = select$
			.pipe(
				map(values => {
					const isNumeric =
						values.find(value => typeof value === "string") === undefined

					return values.map(value => ({
						[isNumeric ? "qNumber" : "qText"]: value,
						qIsNumeric: isNumeric,
					}))
				}),
				combineLatest(field$),
				switchMap(([selections, fieldHandle]) =>
					fieldHandle.ask("SelectValues", selections, false)
				)
			)
			.subscribe()

		return () => sub$.unsubscribe()
	}, [field, doc$])

	const select = values => select$.next(values)

	return { select }
}
