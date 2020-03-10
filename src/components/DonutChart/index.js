import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import Arc from "../ChartComponents/arc";
import LegendItem from "../ChartComponents/legend-item";
import PropTypes from "prop-types";

const style = {
  wholeContainer: { margin: "2%" },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  groupVar: {
    position: "relative",
    display: "flex",
    margin: "1% 0% 1% -12%",
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
    left: "45%",
  },
  lowMarginLegendContainer: {
    flex: 1,
    position: "absolute",
    left: "40%",
  },
  title: {
    fontWeight: 750,
    fontSize: "26px",
  },
};

const DonutChart = ({
  classes,
  innerRadius,
  outerRadius,
  data,
  legendData,
  colors,
}) => {
  var pie = d3.pie().value(d => d.value)(data);
  var translate = `translate(130,130)`;
  var total = 0;
  return (
    <div className={classes.wholeContainer}>
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
  colors: ["#FFA600", "#00568E", "#E0E0E0"],
  valueInDonut: true,
};
export default withStyles(style)(DonutChart);
