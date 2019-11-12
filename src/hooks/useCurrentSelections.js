import { useEffect, useState } from "react";
import { useSession } from "../context";
import { invalidations } from "rxq";
import { map, switchMap, take, retry } from "rxjs/operators";
import { qAskReplayRetry } from "../operators";

export default () => {
  const {
    rxq: { doc$ },
  } = useSession()[0];

  const [currentSelections, setCurrentSelections] = useState(null);

  useEffect(() => {
    const currentSelectionsObj$ = doc$.pipe(
      qAskReplayRetry("CreateSessionObject", {
        qInfo: { qType: "currentselections" },
        currentSelections: { qStringExpression: "=GetCurrentSelections(', ')" },
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
          qAskReplayRetry("GetProperties"),
          map(props => props.qInfo.qId),
          switchMap(id =>
            doc$.pipe(qAskReplayRetry("DestroySessionObject", id))
          ),
          take(1)
        )
        .subscribe();

      layout$.unsubscribe();
    };
  }, []);

  return currentSelections;
};
