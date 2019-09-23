import { useEffect, useState } from "react";
import { useSession } from "dash-component-library/context";
import { qAskReplay, invalidations } from "rxq";
import { map, switchMap, take, retry } from "rxjs/operators";

export default () => {
  const {
    rxq: { doc$ }
  } = useSession()[0];

  const [currentSelections, setCurrentSelections] = useState(null);

  useEffect(() => {
    const currentSelectionsObj$ = doc$.pipe(
      qAskReplay("CreateSessionObject", {
        qInfo: { qType: "currentselections" },
        currentSelections: { qStringExpression: "=GetCurrentSelections()" }
      })
    );

    const layout$ = currentSelectionsObj$
      .pipe(
        invalidations(true),
        switchMap(handle => handle.ask("GetLayout").pipe(retry(3))),
        map(layout => layout.currentSelections)
      )
      .subscribe(setCurrentSelections);

    return () => {
      currentSelectionsObj$
        .pipe(
          qAskReplay("GetProperties"),
          map(props => props.qInfo.qId),
          switchMap(id => doc$.pipe(qAskReplay("DestroySessionObject", id))),
          take(1)
        )
        .subscribe();

      layout$.unsubscribe();
    };
  }, []);

  return currentSelections;
};
