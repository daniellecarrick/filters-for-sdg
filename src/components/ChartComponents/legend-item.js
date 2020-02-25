import React from "react";
import withStyles from "react-jss";
import Variance from "../Variance";
const styles = {
  legendContainer: {
    display: "flex",
    flexDoirection: "row",
    padding: "10px",
    margin: "10px 10px 10px 20px",
  },
  legendBlock: {
    width: "10px",
    height: "60px",
  },
  legendTextContainer: {
    marginLeft: "10px",
  },
  value: {
    flex: 1,
    fontWeight: "750",
    fontSize: "14px",
    paddingBottom: "2px",
  },
  variance: {
    flex: 1,
  },
  type: {
    fontSize: "12px",
    paddingBottom: "2px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "120px",
    textOverflow: "ellipsis",
  },
};
const formatNumber = (num, dollar) => {
  var formattedNum = 0;
  if (num < Math.pow(10, 3)) {
    formattedNum = num.toFixed(1);
  } else if (num < Math.pow(10, 6)) {
    formattedNum = (num / Math.pow(10, 3)).toFixed(1) + "K";
  } else if (num < Math.pow(10, 9)) {
    formattedNum = (num / Math.pow(10, 6)).toFixed(1) + "M";
  } else {
    formattedNum = (num / Math.pow(10, 9)).toFixed(1) + "B";
  }

  if (dollar) {
    return "$" + formattedNum;
  } else return formattedNum;
};
const LegendItem = ({ classes, color, data }) => {
  return (
    <div className={classes.legendContainer}>
      <div className={classes.legendBlock} style={{ background: color }} />
      <div className={classes.legendTextContainer}>
        <div className={classes.type}>{data.type}</div>
        <div className={classes.value}>{formatNumber(data.value)}</div>
        <div className={classes.variance}>
          <Variance newValue={data.value} oldValue={data.oldValue} />
        </div>
      </div>
    </div>
  );
};
export default withStyles(styles)(LegendItem);
