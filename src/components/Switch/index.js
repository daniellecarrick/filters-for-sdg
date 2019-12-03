import React from "react";
import PropTypes from "prop-types";
import { Switch as MUISwitch } from "@material-ui/core";
import withStyles from "react-jss";
import classNames from "classnames";

const styles = {
  switchBase: {
    color: "#4A4A4A",
    "&$checked.Mui-checked": { color: "#4A4A4A" },
    "&$checked.Mui-checked + $track": { backgroundColor: "#C4C4C4" },
    "&.MuiIconButton-root:hover": { backgroundColor: "transparent" },
    "&$checked.Mui-checked:hover": { backgroundColor: "transparent" },
  },
  thumb: { boxShadow: "none" },
  checked: {},
  track: { backgroundColor: "#C4C4C4" },
  labels: { fontSize: "12px", fontWeight: 500 },
  deSelected: { color: "#C4C4C4" },
};

const Switch = ({
  textLeft = "Off",
  valueLeft = "off",
  textRight = "On",
  valueRight = "on",
  state: [value, onChange] = ["off", () => {}],
  className,
  classes,
}) => {
  const { labels, deSelected, ...switchClasses } = classes;
  const handleChange = (_evt, checked) =>
    onChange(checked ? valueRight : valueLeft);

  return (
    <div className={classNames(labels, className)}>
      <span className={value !== valueLeft ? deSelected : ""}>{textLeft}</span>
      <MUISwitch
        classes={switchClasses}
        onChange={handleChange}
        disableRipple
      />
      <span className={value !== valueRight ? deSelected : ""}>
        {textRight}
      </span>
    </div>
  );
};

Switch.propTypes = {
  /** text to left of switch */
  textLeft: PropTypes.string,
  /** value when switch is in left position */
  valueLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** text to right of switch */
  textRight: PropTypes.string,
  /** value when switch is in right position */
  valueRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** state controller of button. takes in an array where the first value
   * is the current state of the switch, and the second is the state change
   * function that updates the state */
  state: PropTypes.array,
  /** className that can access the top level element of this component */
  className: PropTypes.string,
};

export default withStyles(styles)(Switch);
