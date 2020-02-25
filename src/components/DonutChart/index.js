import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import Arc from "../ChartComponents/arc";
import LegendItem from "../ChartComponents/legend-item";
import PropTypes from "prop-types";

const style = {
  wholeContainer: {
    margin: "3% 2% 3% 2%",
  },
  lowMarginContainer: {
    margin: "3% 0% 3% 0%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  groupVar: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    margin: "1%",
  },
  label: {
    position: "absolute",
    top: "75%",
    left: "22%",
    fontWeight: 750,
    fontSize: "26px",
  },
  hideLabel: {
    display: "none",
  },
  svgVar: {
    width: "100%",
    height: "160%",
    marginLeft: "-10%",
  },
  legendContainer: {
    flex: 1,
    position: "absolute",
    left: "60%",
  },
  title: {
    fontWeight: 750,
    fontSize: "26px",
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

const DonutChart = ({
  classes,
  innerRadius,
  outerRadius,
  data,
  legendData,
  colors,
  valueInDonut,
}) => {
  var pie = d3.pie().value(d => d.value)(data);
  var translate = `translate(130,130)`;
  var total = 0;
  return (
    <div
      className={
        valueInDonut ? classes.wholeContainer : classes.lowMarginContainer
      }
    >
      <div className={classes.contentContainer}>
        <div className={classes.groupVar}>
          <svg className={classes.svgVar}>
            <g transform={translate}>
              {pie.map((d, i) => {
                total = total + d.value;
                return (
                  <Arc
                    key={`arc-${i}`}
                    data={d}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    color={colors[i]}
                    total={total}
                  />
                );
              })}
            </g>
          </svg>
          <div className={valueInDonut ? classes.label : classes.hideLabel}>
            {formatNumber(total)}
          </div>
          <div className={classes.legendContainer}>
            {legendData.map((d, i) => {
              return (
                <LegendItem key={`legend-${i}`} data={d} color={colors[i]} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
DonutChart.propTypes = {
  /** Outer radius is the radius of the outer circle in the donut chart */
  outerRadius: PropTypes.number,
  /** Inner radius is the radius of the inner circle in the donut chart */
  innerRadius: PropTypes.number,
  /** data is the object that contains our data to be displayed in the donut chart */
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** legenData is the object that contains our data to be displayed in the Legend & variance */
  legendData: PropTypes.array,
  /** Colors is an array that contains list of hexadecimal color values to be displayed in the donut chart */
  colors: PropTypes.array,
};

DonutChart.defaultProps = {
  outerRadius: 90,
  innerRadius: 60,
  colors: ["#55B1F3", "#3A66BB", "#C4C4C4"],
  valueInDonut: true,
};
export default withStyles(style)(DonutChart);
