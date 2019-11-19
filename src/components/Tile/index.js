import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSession } from "../../context";
import { Subject, from } from "rxjs";
import {
  withLatestFrom,
  switchMap,
  mergeMap,
  catchError,
} from "rxjs/operators";
import withStyles from "react-jss";
import { DownloadButton } from "../";

const styles = {
  tile: {
    position: "relative",
    padding: "16px",
    backgroundColor: "#fff",
    fontFamily: "Rubik !important",
  },
  tileTitle: {
    marginBottom: "30px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000",
  },
  tile__downloadButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
  },
  tileFooter: {
    color: "#979797",
    textAlign: "center",
    paddingTop: "10px",
  },
  line: {
    margin: "10px 0px",
    border: "0.5px solid #e1e1e1",
  },
};

const Tile = ({
  title,
  footer,
  anchor,
  downloadIds = [],
  className,
  classes,
  children,
}) => {
  let doc$, download$;
  if (downloadIds.length) {
    const { rxq } = useSession()[0];
    doc$ = rxq.doc$;

    download$ = useRef(new Subject()).current;
  }

  useEffect(() => {
    let sub$;
    if (downloadIds.length) {
      sub$ = download$
        .pipe(
          switchMap(id => from(id)),
          withLatestFrom(doc$),
          mergeMap(([id, docHandle]) => docHandle.ask("GetObject", id)),
          mergeMap(objHandle =>
            objHandle.ask("ExportData", "CSV_C", "/qHyperCubeDef")
          ),
          catchError(err => {
            console.log(err);
          })
        )
        .subscribe(({ qUrl }) => {
          window.open(`https://dash.condenast.com${qUrl}`);
        });
    }

    return () => {
      if (sub$) sub$.unsubscribe();
    };
  }, []);

  return (
    <div id={anchor} className={classNames("tile", classes.tile, className)}>
      {downloadIds.length > 0 ? (
        <DownloadButton
          className={classes.tile__downloadButton}
          downloadIds={downloadIds}
        />
      ) : null}
      {title ? (
        <div className={classNames("title", classes.tileTitle)}>{title}</div>
      ) : null}
      <div className="tile__content">{children}</div>
      {footer ? (
        <div className={classes.tileFooter}>
          <hr className={classes.line} />
          <div>{footer}</div>
        </div>
      ) : null}
    </div>
  );
};

Tile.propTypes = {
  /** title displayed at top of tile */
  title: PropTypes.string,
  /** footer displayed at bottom of tile */
  footer: PropTypes.string,
  /** id of parent element of tile, used for connection with the Navigator
   * component */
  anchor: PropTypes.string,
  /** array of qlik sense object ids that will be downloaded if the tile's
   * download button is clicked. An empty array means no button will be shown */
  downloadIds: PropTypes.arrayOf(PropTypes.string),
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

export default withStyles(styles)(Tile);
