import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "../";
import { useSession } from "../../context";
import { Subject } from "rxjs";
import { withLatestFrom, pluck } from "rxjs/operators";
import withStyles from "react-jss";
import classNames from "classnames";
import refresh from "../../resources/images/refresh.png";
import { qAskReplayRetry } from "../../operators";

const styles = {
  clearButton: { "&:hover": { backgroundColor: "#fff" } },
  clearButton__refreshIcon: { width: "12px", marginLeft: "10px" },
};

const ClearButton = ({ onClear, className, classes }) => {
  const {
    rxq: { doc$ },
  } = useSession()[0];

  const clear$ = useRef(new Subject()).current;
  useEffect(() => {
    const sub$ = clear$
      .pipe(
        withLatestFrom(doc$),
        pluck(1),
        qAskReplayRetry("ClearAll")
      )
      .subscribe(() => onClear());

    return () => sub$.unsubscribe();
  }, [clear$, doc$]);

  return (
    <Button
      theme="light"
      className={classNames("clear-button", className, classes.clearButton)}
      onClick={() => clear$.next()}
    >
      Clear Filters
      <img
        className={classNames(
          "clear-button__refresh-icon",
          classes.clearButton__refreshIcon
        )}
        src={refresh}
      />
    </Button>
  );
};

ClearButton.propTypes = {
  /** function run when the clear has completed */
  onClear: PropTypes.func,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

ClearButton.defaultProps = {
  onClear: () => {},
};

export default withStyles(styles)(ClearButton);
