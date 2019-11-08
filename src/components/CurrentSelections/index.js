import React from "react";
import withStyles from "react-jss";
import { useCurrentSelections } from "../../hooks";

const styles = {};
export default withStyles(styles)(({ className, classes }) => {
  const currentSelections = useCurrentSelections();

  return currentSelections !== null && currentSelections !== "-" ? (
    <div className={className}>{currentSelections}</div>
  ) : null;
});
