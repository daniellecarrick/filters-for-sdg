import React from "react";
import withStyles from "react-jss";
import Variance from "../Variance";
import { Card } from "../index";
import { formatNumber } from "../../utils/numberFormatting";
import PropTypes from "prop-types";
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
  largeValue: {
    fontWeight: 650,
    fontSize: "30px",
    display: "inline-block",
    marginLeft: "10px",
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

const CneKPI = ({
  classes,
  value,
  oldValue,
  label,
  percentageValue,
  dollar,
  decimal,
  time,
  kpiLarge,
}) => {
  return (
    <Card border={false}>
      <div className={classes.kpiContainer}>
        <div className={kpiLarge ? classes.largeValue : classes.value}>
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
    </Card>
  );
};
CneKPI.propTypes = {
  /** Value is the number that will be formated into Kilos, Millions or  Billions and displayed as the main KPI */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** oldValue is a number that will passed to variance component to compute the variance percentage */
  oldValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Num is the number that will be formated into Kilos, Millions or  Billions */
  label: PropTypes.string,
  /** KPI Large is a boolean that will specify whther the KPI Value displayed should be Large or normal. */
  kpiLarge: PropTypes.boolean,
  /** Num is the number that will be formated into Kilos, Millions or  Billions */
  num: PropTypes.number,
  /** Dollar is a boolean that will denote if a formatted number needs $ sign before it or not*/
  dollar: PropTypes.boolean,
  /** decimal is a number that denotes how many decimal values the formatted number should be having for detail.
   * ex decimal=2 => there will be 2 digits after decimal point */
  decimal: PropTypes.number,
  /** percentage value is a number that'll hold the exact percentage to be displayed.
   * If a value ispassed will be displayed as it is without any formatting done with the '%' symbol appended at the end*/
  percentageValue: PropTypes.number,
  /** Time is a number that denotes the number of minutes. This will be formated in kilos or Millions or Billions.
   * once formatting is done the final string will be displayed as XX M Hrs : XX Mins */
  time: PropTypes.number,
};

CneKPI.defaultProps = {
  dollar: false,
  label: "",
  kpiLarge: false,
  percentageValue: null,
  time: null,
};

export default withStyles(style)(CneKPI);
