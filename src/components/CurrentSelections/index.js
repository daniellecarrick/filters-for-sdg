import React from "react";
import withStyles from "react-jss";
import { useCurrentSelections } from "../../hooks";
import classNames from "classnames";

const styles = {
  currentSelections: {
    fontFamily: "Rubik !important",
  },
};

export default withStyles(styles)(({ className, classes }) => {
  const currentSelections = useCurrentSelections();

  return currentSelections !== null && currentSelections !== "-" ? (
    <div className={classNames(className, classes.currentSelections)}>
      {currentSelections}
    </div>
  ) : null;
});
