import React from "react";
import withStyles from "react-jss";
import Variance from "../Variance";
import { Card } from "../index";
import { formatNumber } from "../../utils/numberFormatting";

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
    <Card border={false}>
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
    </Card>
  );
};

CneKPI.defaultProps = {
  dollar: false,
  label: "",
  percentageValue: null,
  time: null,
};

export default withStyles(style)(CneKPI);
