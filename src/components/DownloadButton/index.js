import React, { useRef, useEffect } from "react";
import { Subject, from } from "rxjs";
import {
  switchMap,
  withLatestFrom,
  mergeMap,
  catchError,
  retry,
} from "rxjs/operators";
import { useSession } from "../context";
import withStyles from "react-jss";
import downloadIcon from "../resources/images/download.svg";
import classNames from "classnames";

const styles = {
  downloadButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    width: "24px",
    height: "24px",
    backgroundImage: `url(${downloadIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    border: "none",
    cursor: "pointer",
  },
};

export default withStyles(styles)(
  ({ downloadIds = [], className, classes }) => {
    const {
      rxq: { doc$ },
    } = useSession()[0];
    const download$ = useRef(new Subject()).current;

    useEffect(() => {
      const sub$ = download$
        .pipe(
          switchMap(id => from(id)),
          withLatestFrom(doc$),
          mergeMap(([id, docHandle]) => docHandle.ask("GetObject", id)),
          mergeMap(objHandle =>
            objHandle
              .ask("ExportData", "CSV_C", "/qHyperCubeDef")
              .pipe(retry(3))
          ),
          catchError(err => {
            console.log(err);
          })
        )
        .subscribe(({ qUrl }) => {
          window.open(`https://dash.condenast.com${qUrl}`);
        });

      return () => sub$.unsubscribe();
    }, []);

    return (
      <button
        className={classNames(classes.downloadButton, className)}
        onClick={() => download$.next(downloadIds)}
      />
    );
  }
);
