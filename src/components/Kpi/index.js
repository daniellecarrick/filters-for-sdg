import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "react-jss";

const styles = {
  kpi: { fontFamily: "Rubik !important", textAlign: "center" },
  kpi__label: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#979797",
  },
  kpi__value: {
    fontSize: "64px",
    fontWeight: "500",
    color: "#ffb800",
  },
};

const Kpi = ({ label, className, classes, children }) => {
  return (
    <div className={classNames("kpi", classes.kpi, className)}>
      <div className={classNames("kpi__label", classes.kpi__label)}>
        {label}
      </div>
      <div className={classNames("kpi__value", classes.kpi__value)}>
        {children}
      </div>
    </div>
  );
};

Kpi.propTypes = {
  /** Label above kpi */
  label: PropTypes.string,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

export default withStyles(styles)(Kpi);
