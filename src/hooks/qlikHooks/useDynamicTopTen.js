// a hook to get the top ten pieces of content given the content_type, the field (brand or topic)
// and the dimension within the field to use for set analysis

import { useState, useEffect } from "react";
import { pluck, map, retry, switchMap } from "rxjs/operators";
import { CreateSessionObject } from "rxq/Doc";
import { GetLayout } from "rxq/GenericVariable";
import { invalidations, qAskReplay } from "rxq";
import { measureFields } from "../../qlikDefinitions/measures";

const objDef = {
  qInfo: {
    qType: "customObj"
  },
  qHyperCubeDef: {
    qInitialDataFetch: [
      {
        qHeight: 10,
        qWidth: 4
      }
    ],
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["header"]
        },
        qTotalLabel: {},
        qCalcCond: {},
        qAttributeExpressions: [],
        qAttributeDimensions: [],
        qCalcCondition: {
          qCond: {},
          qMsg: {}
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qFieldDefs: ["url"]
        },
        qTotalLabel: {},
        qCalcCond: {},
        qAttributeExpressions: [],
        qAttributeDimensions: [],
        qCalcCondition: {
          qCond: {},
          qMsg: {}
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qFieldDefs: ["image_url"]
        },
        qTotalLabel: {},
        qCalcCond: {},
        qAttributeExpressions: [],
        qAttributeDimensions: [],
        qCalcCondition: {
          qCond: {},
          qMsg: {}
        },
        qNullSuppression: true
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef: ""
        },
        qLabel: "Max",
        qLibraryId: null,
        qSortBy: {
          qSortByState: 0,
          qSortByFrequency: 0,
          qSortByNumeric: -1,
          qSortByAscii: 0,
          qSortByLoadOrder: 0,
          qSortByExpression: 0,
          qExpression: {
            qv: " "
          }
        }
      }
    ],
    qInterColumnSortOrder: [0, 1, 2, 3],
    qSuppressZero: false,
    qSuppressMissing: false,
    qMode: "S"
  }
};

const useDynamicTopTen = (field, included, contentType, app$) => {
  const objProps = JSON.parse(JSON.stringify(objDef));
  const additionalSetAnalysis = `header-={'NA', 'Unknown', 'Na'},url-={'NA', 'Unknown', 'Na'},image_url-={'NA', 'Unknown', 'Na'}`;
  objProps.qHyperCubeDef.qMeasures[0].qDef.qDef = `(Sum({<${field}={'${included}'}, content_type={'${contentType}'}, ${additionalSetAnalysis}>}${measureFields.contentNetworkPVs}))`;

  const [top10, setTop10] = useState([]);
  useEffect(() => {
    const obj$ = app$.pipe(
      qAskReplay(CreateSessionObject, objProps),
      invalidations(true)
    );
    const objSub = obj$
      .pipe(
        switchMap(handle => handle.ask(GetLayout).pipe(retry(3))),
        pluck("qHyperCube", "qDataPages", 0, "qMatrix"),
        map(matrix => {
          return matrix.map(row => ({
            text: row[0].qText,
            value: row[3].qNum,
            url: row[1].qText,
            image_url: row[2].qText
          }));
        })
      )
      .subscribe(result => setTop10(result));
    return () => objSub.unsubscribe();
    /* NOTE: es-lint wants to add app$ and objProps to this dependency array but doing so causes infinite re-renders */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, included, contentType]);

  return top10;
};

export default useDynamicTopTen;
