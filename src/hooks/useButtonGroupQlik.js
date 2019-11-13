import { useRef, useEffect, useState } from "react";
import { Subject } from "rxjs";
import { useSession } from "../context";
import { invalidations } from "rxq";
import {
  map,
  take,
  filter,
  switchMap,
  combineLatest,
  retry,
} from "rxjs/operators";
import { qAskReplayRetry } from "../operators";

export default ({ field }) => {
  const {
    app,
    rxq: { doc$ },
  } = useSession()[0];

  const [buttons, setButtons] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const select$ = useRef(new Subject()).current;

  useEffect(() => {
    const listObj$ = doc$.pipe(
      qAskReplayRetry("CreateSessionObject", {
        qInfo: { qType: "listobject" },
        qListObjectDef: {
          qDef: { qFieldDefs: [field] },
          qInitialDataFetch: [{ qWidth: 1, qHeight: 100 }],
        },
      })
    );

    const setButtons$ = listObj$
      .pipe(
        invalidations(true),
        qAskReplayRetry("GetLayout"),
        map(layout =>
          layout.qListObject.qDataPages[0].qMatrix.map(row => ({
            label: row[0].qText,
            name: row[0].qElemNumber,
          }))
        ),
        take(1)
      )
      .subscribe(setButtons);

    const setSelectedLabel$ = listObj$
      .pipe(
        invalidations(true),
        qAskReplayRetry("GetLayout"),
        map(layout =>
          layout.qListObject.qDataPages[0].qMatrix
            .filter(row => row[0].qState === "S")
            .map(row => row[0].qText)
        ),
        map(selection => (selection.length ? selection[0] : null))
      )
      .subscribe(setSelectedLabel);

    const selectionStream$ = select$
      .pipe(
        filter(dimElemNo => dimElemNo !== null),
        combineLatest(listObj$),
        switchMap(([dimElemNo, obj$]) =>
          obj$
            .ask(
              "SelectListObjectValues",
              "/qListObjectDef",
              [dimElemNo],
              false
            )
            .pipe(retry(3))
        )
      )
      .subscribe();

    return () => {
      listObj$
        .pipe(
          qAskReplayRetry("GetProperties"),
          map(props => props.qInfo.qId),
          switchMap(id =>
            doc$.pipe(qAskReplayRetry("DestroySessionObject", id))
          ),
          take(1)
        )
        .subscribe();

      setButtons$.unsubscribe();
      setSelectedLabel$.unsubscribe();
      selectionStream$.unsubscribe();
    };
  }, [select$]);

  useEffect(() => {
    select$.next(selectedValue);
  }, [selectedValue]);

  return { buttons, selectedValue, setSelectedValue, selectedLabel };
};
