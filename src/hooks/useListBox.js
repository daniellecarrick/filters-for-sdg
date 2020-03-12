import { useState, useEffect } from "react";
import { CreateSessionObject } from "rxq/Doc";
import { qAsk } from "rxq";

const useListBoxHandle = (
  fieldName,
  app$,
  sortBy = { number: 0, alpha: 0 }
) => {
  const [value, setValue] = useState(null);
  const listBoxProps = {
    qInfo: {
      qType: "listBox",
    },
    qListObjectDef: {
      qDef: {
        qFieldDefs: [`${fieldName}`],
        qSortCriterias: [
          {
            qSortByNumeric: sortBy.number,
            qSortByAscii: sortBy.aplha,
            // qSortByExpression: sortBy.expression,
            // qExpression: {
            //   qv: sortBy.expression,
            // },
          },
        ],
      },
      qInitialDataFetch: [
        {
          qTop: 0,
          qLeft: 0,
          qWidth: 2,
          qHeight: 100,
        },
      ],
    },
    selections: {
      qStringExpression: `GetFieldSelections([${fieldName}])`,
    },
  };

  useEffect(() => {
    const objSub = app$
      .pipe(qAsk(CreateSessionObject, listBoxProps))
      .subscribe(objHandle => setValue(objHandle));
    return () => objSub.unsubscribe();
  }, [fieldName]);

  return value;
};

export default useListBoxHandle;
