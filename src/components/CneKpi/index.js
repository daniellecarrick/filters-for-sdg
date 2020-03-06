import React from "react";
import withStyles from "react-jss";
import Variance from "../Variance";
import Tile from "./tile";

const style = {
  kpiContainer: {
    margin: "1%",
    padding: "1%",
  },
  kpiContainerHorizontal: {
    margin: "1%",
    padding: "1%",
    flexWrap: "wrap",
    display: "flex",
  },
  value: {
    fontWeight: 500,
    fontSize: "20px",
    display: "inline-block",
  },
  dollarValue: {
    fontWeight: 500,
    fontSize: "20px",
    display: "inline-block",
  },
  label: {
    color: "#4B4B4B",
    display: "inline-block",
    fontSize: "12px",
    paddingBottom: "5px",
  },
  variance: {
    display: "inline-block",
  },
};
const highColor = "#126274";
// Function to conver the number into K / Mn / Bn
const formatNumber = (num, dollar, decimal, percentageValue, time) => {
  const roundOff = decimal ? decimal : 1;
  var formattedNum = 0;
  if (time) {
    return time;
  } else if (percentageValue) {
    return percentageValue + "%";
  } else {
    if (num < Math.pow(10, 3)) {
      formattedNum = num.toFixed(roundOff);
    } else if (num < Math.pow(10, 6)) {
      formattedNum = (num / Math.pow(10, 3)).toFixed(roundOff) + "K";
    } else if (num < Math.pow(10, 9)) {
      formattedNum = (num / Math.pow(10, 6)).toFixed(roundOff) + "M";
    } else {
      formattedNum = (num / Math.pow(10, 9)).toFixed(roundOff) + "B";
    }

    if (dollar) {
      return "$" + formattedNum;
    } else return formattedNum;
  }
};
const CneKPI = ({
  classes,
  value,
  oldValue,
  label,
  percentageValue,
  dollar,
  decimal,
  time,
}) => {
  return (
    <Tile wrapper={true}>
      <div className={classes.kpiContainer}>
        <div className={dollar ? classes.dollarValue : classes.value}>
          {formatNumber(value, dollar, decimal, percentageValue, time)}
        </div>{" "}
        <br />
        <div className={classes.label}>{label}</div>
        <br />
        <div className={classes.variance}>
          <Variance
            className={classes.varianceBlock}
            newValue={value}
            oldValue={oldValue}
            highColor={highColor}
          />
        </div>
      </div>
    </Tile>
  );
};

CneKPI.defaultProps = {
  dollar: false,
  label: "",
  percentageValue: null,
  time: null,
};

export default withStyles(style)(CneKPI);
