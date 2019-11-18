import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSession } from "../../context";
import { invalidations } from "rxq";
import { Subject } from "rxjs";
import {
  map,
  tap,
  withLatestFrom,
  switchMap,
  take,
  switchMapTo,
} from "rxjs/operators";
import withStyles from "react-jss";
import classNames from "classnames";
import * as brandImages from "../../resources/images/brands";
import { qAskReplayRetry } from "../../operators";

const styles = {
  brandDropdown: { marginRight: "10px" },
  brandDropdown__container: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
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
};

const BrandSelector = ({
  field,
  fieldMap,
  singleSelect = false,
  setSelectedBrand = () => {},
  className,
  classes,
}) => {
  const {
    rxq: { doc$ },
  } = useSession()[0];

  /** Get brand list */

  const [brandList, setBrandList] = useState([]);
  const selectBrand$ = useRef(new Subject()).current;
  useEffect(() => {
    const fullBrandList = [
      { code: "ALL" },
      { code: "AD" },
      { code: "ARST" },
      { code: "BA" },
      // { code: "BRDE" },
      { code: "CNT" },
      { code: "EPIC" },
      { code: "GLAM" },
      // { code: "GFDG" },
      { code: "GQ" },
      { code: "PTFK" },
      { code: "SELF" },
      { code: "VOGT" },
      { code: "TNY" },
      { code: "VF" },
      { code: "VOG" },
      // { code: "W" },
      { code: "WIRE" },
    ];

    const brandListObj$ = doc$.pipe(
      qAskReplayRetry("CreateSessionObject", {
        qInfo: { qType: "listobject" },
        qListObjectDef: {
          qDef: {
            qFieldDefs: [field],
          },
          qInitialDataFetch: [{ qWidth: 1, qHeight: 100 }],
        },
      })
    );

    const brandLayout$ = brandListObj$
      .pipe(
        invalidations(true),
        qAskReplayRetry("GetLayout"),
        map(layout => layout.qListObject.qDataPages[0].qMatrix),
        map(qMatrix =>
          qMatrix.map(row => ({
            code: row[0].qText,
            elemNumber: row[0].qElemNumber,
            selectionState: row[0].qState,
          }))
        ),
        map(brandList => {
          const mappedBrandList = brandList.map(brand => {
            if (fieldMap) {
              return {
                ...brand,
                code: fieldMap[brand.code],
              };
            } else return brand;
          });
          const existingBrands = mappedBrandList.map(brand => brand.code);
          return fullBrandList
            .filter(brand => !existingBrands.includes(brand.code))
            .concat(...mappedBrandList)
            .filter(brand => brand.code !== undefined);
        }),
        tap(brandList => {
          const selectedBrand = brandList.filter(
            brand => brand.selectionState === "S"
          );
          if (selectedBrand.length > 0) {
            const selected = selectedBrand.map(brand => brand.code).join(", ");
            setSelectedBrand(selected);
          } else {
            setSelectedBrand(null);
          }
        })
      )
      .subscribe(setBrandList);

    const selectionSub$ = selectBrand$
      .pipe(
        withLatestFrom(brandListObj$),
        switchMap(([brand, brandListObjHandle]) => {
          const select = brandListObjHandle.ask(
            "SelectListObjectValues",
            "/qListObjectDef",
            [brand],
            true
          );
          if (singleSelect) {
            return brandListObjHandle
              .ask("ClearSelections", "/qListObjectDef")
              .pipe(switchMapTo(select));
          }
          return select;
        })
      )
      .subscribe();

    return () => {
      brandListObj$
        .pipe(
          qAskReplayRetry("GetProperties"),
          map(props => props.qInfo.qId),
          switchMap(id =>
            doc$.pipe(qAskReplayRetry("DestroySessionObject", id))
          ),
          take(1)
        )
        .subscribe();
      brandLayout$.unsubscribe();
      selectionSub$.unsubscribe();
    };
  }, [doc$, selectBrand$, field]);

  return (
    <div className={classNames(classes.brandDropdown__container, className)}>
      {brandList.map((brand, i) => (
        <input
          type="button"
          key={i}
          className={classNames(classes.brandDropdown__input, {
            [classes.brandDropdown__input_selected]:
              brand.selectionState === "S",
          })}
          style={{
            backgroundImage: `url(${brandImages[brand.code]})`,
          }}
          onClick={() => {
            brand.elemNumber >= 0 ? selectBrand$.next(brand.elemNumber) : null;
          }}
        />
      ))}
    </div>
  );
};

BrandSelector.propTypes = {
  /** Qlik Sense field name to feed the selector */
  field: PropTypes.string,
  /** Mapping object to convert Qlik Sense values to short name format */
  fieldMap: PropTypes.object,
  /** singleSelect mode allows for only 1 brand selection at a time */
  singleSelect: PropTypes.bool,
  /** function passed in that runs every time the selected brand value changes */
  setSelectedBrand: PropTypes.func,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

BrandSelector.defaultProps = {
  singleSelect: false,
  setSelectedBrand: () => {},
};

export default withStyles(styles)(BrandSelector);
