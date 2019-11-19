import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import { useCurrentSelections } from "../../hooks";
import classNames from "classnames";

const styles = {
  currentSelections: {
    fontFamily: "Rubik !important",
  },
};

const CurrentSelections = ({ className, classes }) => {
  const currentSelections = useCurrentSelections();

  return currentSelections !== null && currentSelections !== "-" ? (
    <div className={classNames(className, classes.currentSelections)}>
      {currentSelections}
    </div>
  ) : null;
};

CurrentSelections.propTypes = {
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

export default withStyles(styles)(CurrentSelections);
