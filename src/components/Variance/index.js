import React from "react";
import * as d3 from "d3";
import withStyles from "react-jss";
import downArrow from "../../resources/images/down-arrow.png";
import upArrow from "../../resources/images/up-arrow.png";
import { PropTypes } from "prop-types";
import classNames from "classnames";

const styles = {
  varianceBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: "3px",
    // paddingBottom: "2px",
    width: "60px",
    height: "16px",
  },
  image: {
    height: "8px",
    width: "8px",
    padding: "7px 2px 7px 7px",
  },
  variancePercent: {
    fontSize: "12px",
    fontWeight: "500",
    color: "white",
    padding: "3px",
  },
};

// default colorUp: "#12BF38"
// default colorDown: "#EF4A4A"

/* takes in two values new and old as numbers compares the two and 
calculates the variance percentage and returns a block with the % of variance. 
If the variance is negative returns a red block and if the variance is positive 
returns a green block */
const Variance = ({
  classes,
  className,
  newValue,
  oldValue,
  highColor,
  lowColor,
}) => {
  const percentConvertor = newValue - oldValue > 0 ? 100 : -100;
  if (oldValue) {
    return (
      <div
        className={classNames(classes.varianceBlock, className)}
        style={
          newValue - oldValue > 0
            ? { background: highColor }
            : { background: lowColor }
        }
      >
        <img
          className={classes.image}
          src={newValue - oldValue > 0 ? upArrow : downArrow}
        ></img>
        <div className={classes.variancePercent}>
          {(((newValue - oldValue) / oldValue) * percentConvertor).toFixed(0)}%
        </div>
      </div>
    );
  } else return null;
};

Variance.propTypes = {
  /** New value is a number that denotes the current value */
  newValue: PropTypes.number,
  /** Old value is a number that denotes the value to a comparitively older timescale [previous year/previous month/previous week]*/
  oldValue: PropTypes.number,
  /** High Color is a string that denotes the color of the indicator pill when the variance is high */
  highColor: PropTypes.string,
  /** Low Color is a string that denotes the color of the indicator pill when the variance is low */
  lowColor: PropTypes.string,
};

Variance.defaultProps = {
  highColor: "#12BF38",
  lowColor: "#EF4A4A",
};
export default withStyles(styles)(Variance);
