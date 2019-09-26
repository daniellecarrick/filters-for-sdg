import React from "react";
import withStyles from "react-jss";
import { useCurrentSelections } from "dash-component-library/hooks";

const styles = {};
export default withStyles(styles)(({ className, classes }) => {
  const currentSelections = useCurrentSelections();

  return currentSelections !== null && currentSelections !== "-" ? (
    <div className={className}>{currentSelections}</div>
  ) : null;
});
