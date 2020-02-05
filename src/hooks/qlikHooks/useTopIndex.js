import { useState, useEffect } from "react";
import { pluck, map, retry, switchMap } from "rxjs/operators";
import { CreateSessionObject } from "rxq/Doc";
import { GetLayout } from "rxq/GenericVariable";
import { invalidations, qAskReplay } from "rxq";

const topObj = {
  qInfo: {
    qType: "customObj"
  },
  qHyperCubeDef: {
    qInitialDataFetch: [
      {
        qHeight: 100,
        qWidth: 4
      }
    ],
    qDimensions: [
      {
        qDef: {
          qFieldDefs: []
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
          qDef: "=(sum([Segment Pvs])/Sum(TOTAL [Segment Pvs]))"
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
    qInterColumnSortOrder: [1, 0],
    qSuppressZero: false,
    qSuppressMissing: false,
    qMode: "S"
  }
};

const useTopIndex = (field, app$) => {
  const objProps = JSON.parse(JSON.stringify(topObj));
  objProps.qHyperCubeDef.qDimensions[0].qDef.qFieldDefs = [`${field}`];
  objProps.qHyperCubeDef.qMeasures[0].qDef.qDef = `=(sum({<${field}-={'NA', 'Unknown'}>}[Segment Pvs])/Sum(TOTAL {<${field}-={'NA', 'Unknown'}>}[Segment Pvs]))`;

  const [topIndex, setTopIndex] = useState([]);

  useEffect(() => {
    const obj$ = app$.pipe(
      qAskReplay(CreateSessionObject, objProps),
      invalidations(true)
      // tap(() => setTop3([]))
    );
    const objSub = obj$
      .pipe(
        switchMap(handle => handle.ask(GetLayout).pipe(retry(3))),
        pluck("qHyperCube", "qDataPages", 0, "qMatrix"),
        map(matrix => {
          if (typeof field === "object") {
            return matrix.map(row => ({
              text: `${row[0].qText}, ${row[1].qText}, ${row[2].qText}`,
              value: row[3].qNum
            }));
          } else {
            return matrix.map(row => ({
              text: row[0].qText,
              value: row[1].qNum
            }));
          }
        })
      )
      .subscribe(result => setTopIndex(result));
    return () => objSub.unsubscribe();
  }, field);

  return topIndex;
};

export default useTopIndex;
