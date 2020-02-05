import { useState, useEffect } from "react";
import { CreateSessionObject } from "rxq/Doc";
import { qAsk } from "rxq";

const useListBoxHandle = (fieldName, app$, stateName = "$") => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const listBoxProps = {
      qInfo: {
        qType: "listBox"
      },
      qListObjectDef: {
        qStateName: stateName,
        qDef: {
          qFieldDefs: [`${fieldName}`]
        },
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 2,
            qHeight: 100
          }
        ]
      },
      selections: {
        qStringExpression: `GetFieldSelections([${fieldName}],',',6,'${stateName}')`
      }
    };
    const objSub = app$
      .pipe(qAsk(CreateSessionObject, listBoxProps))
      .subscribe(objHandle => setValue(objHandle));
    return () => objSub.unsubscribe();
  }, [fieldName, app$, stateName]);

  return value;
};

export default useListBoxHandle;
