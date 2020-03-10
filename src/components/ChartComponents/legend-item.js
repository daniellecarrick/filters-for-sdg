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
    width: "8px",
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
  labelType: {
    fontSize: "14px",
    paddingBottom: "2px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "120px",
    textOverflow: "ellipsis",
  },
  percentageValue: {
    flex: 1,
    fontWeight: "750",
    fontSize: "18px",
    paddingBottom: "2px",
  },
};
const formatNumber = (num, dollar, percentageValue) => {
  var formattedNum = 0;
  if (percentageValue) {
    return percentageValue + "%";
  } else {
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
  }
};
const varianceColors = { high: "#126274", low: "#EF4A4A" };
const LegendItem = ({ classes, color, data, dollar, percentageValue }) => {
  return (
    <div className={classes.legendContainer}>
      <div className={classes.legendBlock} style={{ background: color }} />
      <div className={classes.legendTextContainer}>
        <div className={classes.percentageValue}>
          {formatNumber(data, dollar, percentageValue)}
        </div>
        <div className={classes.labelType}>{data.type}</div>
        <div className={classes.variance}>
          <Variance
            newValue={data.value}
            oldValue={data.oldValue}
            highColor={varianceColors.high}
            lowColor={varianceColors.low}
          />
        </div>
      </div>
    </div>
  );
};

LegendItem.defaultProps = {
  dollar: false,
  percentageValue: null,
};
export default withStyles(styles)(LegendItem);
