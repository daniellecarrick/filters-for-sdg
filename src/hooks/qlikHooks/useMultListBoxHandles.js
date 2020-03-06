import { useState, useEffect, useRef } from "react";
import { CreateSessionObject } from "rxq/Doc";
import { qAsk } from "rxq";

const useMultListBoxHandles = (fieldName, apps, stateName = "$") => {
  const [value, setValue] = useState([]);
  const appsRef = useRef(apps);
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
        qStringExpression: `GetFieldSelections([${fieldName}])`
      }
    };

    const lbHandles = appsRef.current.map(app$ =>
      app$.pipe(qAsk(CreateSessionObject, listBoxProps))
    );
    setValue(lbHandles);
    return () => {};
  }, [fieldName, appsRef, stateName]);

  return value;
};

export default useMultListBoxHandles;
