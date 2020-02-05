import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Subject, from } from "rxjs";
import {
  switchMap,
  withLatestFrom,
  mergeMap,
  catchError,
  retry,
} from "rxjs/operators";
import { useSession } from "../../context";
import withStyles from "react-jss";
import downloadIcon from "../../resources/images/download.svg";
import classNames from "classnames";

const styles = {
  downloadButton: {
    width: "24px",
    height: "24px",
    backgroundImage: `url(${downloadIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    border: "none",
    cursor: "pointer",
  },
};

const DownloadButton = ({ downloadIds, className, classes }) => {
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
          objHandle.ask("ExportData", "CSV_C", "/qHyperCubeDef").pipe(retry(3))
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
};

DownloadButton.propTypes = {
  /** array of object ids from which to pull data and dowload */
  downloadIds: PropTypes.arrayOf(PropTypes.string),
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

DownloadButton.defaultProps = {
  downloadIds: [],
};

export default withStyles(styles)(DownloadButton);
