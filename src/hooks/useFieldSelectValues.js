import { useEffect } from "react";
import { useSession } from "dash-component-library/context";
import { qAskReplay } from "rxq";

export default ({ field, values, app }) => {
  const sessions = useSession();
  const {
    rxq: { doc$ }
  } = app ? sessions.find(session => session.name === app) : sessions[0];

  useEffect(() => {
    const field$ = doc$.pipe(qAskReplay("GetField", field));

    const isNumeric =
      values.find(value => typeof value === "string") === undefined;

    const qFieldValues = values.map(value => ({
      [isNumeric ? "qNumber" : "qText"]: value,
      qIsNumeric: isNumeric
    }));

    const sub$ = field$
      .pipe(qAskReplay("SelectValues", qFieldValues, false))
      .subscribe();

    return () => sub$.unsubscribe();
  }, [field, JSON.stringify(values), doc$]);
};
