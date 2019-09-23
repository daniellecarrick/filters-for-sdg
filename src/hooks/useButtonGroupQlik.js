import { useRef, useEffect, useState } from "react";
import { Subject } from "rxjs";
import { useSession } from "dash-component-library/context";
import { qAskReplay, invalidations } from "rxq";
import { map, take, filter, withLatestFrom, switchMap } from "rxjs/operators";

export default ({ field }) => {
  const {
    app,
    rxq: { doc$ }
  } = useSession()[0];

  const [buttons, setButtons] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const select$ = useRef(new Subject()).current;

  useEffect(() => {
    const listObj$ = doc$.pipe(
      qAskReplay("CreateSessionObject", {
        qInfo: { qType: "listobject" },
        qListObjectDef: {
          qDef: { qFieldDefs: [field] },
          qInitialDataFetch: [{ qWidth: 1, qHeight: 100 }]
        }
      })
    );

    const setButtons$ = listObj$
      .pipe(
        invalidations(true),
        qAskReplay("GetLayout"),
        map(layout =>
          layout.qListObject.qDataPages[0].qMatrix.map(row => ({
            label: row[0].qText,
            name: row[0].qElemNumber
          }))
        ),
        take(1)
      )
      .subscribe(setButtons);

    const setSelectedLabel$ = listObj$
      .pipe(
        invalidations(true),
        qAskReplay("GetLayout"),
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
        withLatestFrom(listObj$),
        switchMap(([dimElemNo, obj$]) =>
          obj$.ask(
            "SelectListObjectValues",
            "/qListObjectDef",
            [dimElemNo],
            false
          )
        )
      )
      .subscribe();

    return () => {
      listObj$
        .pipe(
          qAskReplay("GetProperties"),
          map(props => props.qInfo.qId),
          switchMap(id => doc$.pipe(qAskReplay("DestroySessionObject", id))),
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
