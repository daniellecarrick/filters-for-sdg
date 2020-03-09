import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import Variance from "../Variance/index";

const styles = {
  valueLabel: {
    fontSize: "13px",
    fill: "black",
    fontWeight: 500,
  },
  variance: {
    fontWeight: 600,
    textAnchor: "end",
    width: "60px",
  },
  brandName: {
    fontFamily: "Rubik, sans-serif",
    fontSize: "12px",
    fill: "#4a4a4a",
    textAnchor: "end",
  },
};

const BarChart = ({
  classes,
  dimensions,
  data,
  varianceAccessor1,
  varianceAccessor2,
  variance = true,
  label,
  value,
  benchmark,
}) => {
  const timeSpent = data.map(d => d.timeSpent);
  const dataMax = Math.max(...timeSpent);

  var x = d3
    .scaleLinear()
    .domain([0, dataMax])
    .range([0, dimensions.boundedWidth - dimensions.marginLeft]);

  const f = d3.format(".2s");

  return (
    <div className={classes.BarChart}>
      <svg width={dimensions.width} height={700}>
        {data.map((d, i) => {
          return (
            <g>
              <text
                className={classes.brandName}
                x={dimensions.marginLeft - 10}
                y={i * 30 + 12}
              >
                {label(d)}
              </text>
              <rect
                width={x(value(d))}
                height={"15px"}
                fill={benchmark(d) > value(d) ? "#EF4A4A" : "#126274"}
                x={dimensions.marginLeft}
                y={i * 30}
                rx={3}
              />
              <circle
                fill={benchmark(d) > value(d) ? "#4a4a4a" : "#f2f2f2"}
                cx={x(benchmark(d)) + dimensions.marginLeft}
                cy={i * 30 + 7.5}
                r={3}
              />
              <text
                className={classes.valueLabel}
                x={dimensions.boundedWidth + 10}
                y={i * 30 + 12}
              >
                {f(value(d))}
              </text>
              {variance ? (
                <foreignObject
                  x={dimensions.boundedWidth + 50}
                  y={i * 30}
                  width={80}
                  height={16}
                >
                  <Variance
                    newValue={varianceAccessor1(d)}
                    oldValue={varianceAccessor2(d)}
                    highColor={"#126274"}
                  />
                </foreignObject>
              ) : (
                <text>{`${varianceAccessor1(d)}`}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default withStyles(styles)(BarChart);
