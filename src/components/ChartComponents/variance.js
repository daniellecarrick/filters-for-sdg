import React from "react";
import * as d3 from "d3";
import withStyles from "react-jss";
import downArrow from "../../resources/images/down-arrow.png";
import upArrow from "../../resources/images/up-arrow.png";
import { PropTypes } from "prop-types";

const styles = {
  varianceBlock: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "3px",
    paddingBottom: "2px",
    width: "80px",
  },
  image: {
    height: "10px",
    width: "10px",
    padding: "7px",
  },
  variancePercent: {
    fontSize: "15px",
    fontWeight: "700",
    color: "white",
    padding: "3px",
  },
};

/* takes in two values new and old as numbers compares the two and 
calculates the variance percentage and returns a block with the % of variance. 
If the variance is negative returns a red block and if the variance is positive 
returns a green block */
const Variance = ({ classes, newValue, oldValue, highColor, lowColor }) => {
  const percentConvertor = newValue - oldValue > 0 ? 100 : -100;
  if (oldValue) {
    return (
      <div
        className={classes.varianceBlock}
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
  /* New value is a number that denotes the current value */
  newValue: PropTypes.number,
  /* Old value is a number that denotes the value to a comparitively older timescale [previous year/previous month/previous week]*/
  oldValue: PropTypes.number,
  /* High Color is a string that holds the hexadecimal value to denote high variance*/
  highColor: PropTypes.string,
  /* Low Color is a string that holds the hexadecimal value to denote low variance*/
  lowColor: PropTypes.string,
};
export default withStyles(styles)(Variance);
