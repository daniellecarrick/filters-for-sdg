import React from "react";
import withStyles from "react-jss";
import * as d3 from "d3";
import Variance from "../Variance/index";

const styles = {
  numberLabel: {
    fontSize: "12px",
    fill: "black",
    fontWeight: 500,
  },
  variance: {
    fontSize: "12px",
    fill: "#EF4A4A",
    fontWeight: 600,
    textAnchor: "end",
  },
  brandName: {
    fontFamily: "Rubik, sans-serif",
    fontSize: "12px",
    fill: "#4a4a4a",
    textAnchor: "end",
  },
};

const data = [
  {
    brand: "The New Yorker",
    goal: 180071014,
    timeSpent: 208366158,
  },
  {
    brand: "Wired",
    goal: 94568726,
    timeSpent: 122029256,
  },
  {
    brand: "Vanity Fair",
    goal: 88277387,
    timeSpent: 116791302,
  },
  {
    brand: "Teen Vogue",
    goal: 23771643,
    timeSpent: 31491036,
  },
  {
    brand: "Glamour",
    goal: 59090408,
    timeSpent: 56800805,
  },
  {
    brand: "Vogue",
    goal: 61136100,
    timeSpent: 83705322,
  },
  {
    brand: "Allure",
    goal: 44253466,
    timeSpent: 66010598,
  },
  {
    brand: "GQ",
    goal: 51855524,
    timeSpent: 78281229,
  },
  {
    brand: "Arch Digest",
    goal: 18126918,
    timeSpent: 27365902,
  },
  {
    brand: "Pitchfork",
    goal: 50797245,
    timeSpent: 77289997,
  },
  {
    brand: "Self",
    goal: 49500320,
    timeSpent: 76554197,
  },
  {
    brand: "CN Traveler",
    goal: 55918960,
    timeSpent: 40869596,
  },
  {
    brand: "Bon Appetit",
    goal: 74403536,
    timeSpent: 126443929,
  },
  {
    brand: "Epicurious",
    goal: 48162400,
    timeSpent: 93621041,
  },
];

const BarChart = ({ classes, width, dimensions }) => {
  const timeSpent = data.map(d => d.timeSpent);
  const dataMax = Math.max(...timeSpent);

  var x = d3
    .scaleLinear()
    .domain([0, dataMax])
    .range([0, dimensions.boundedWidth - dimensions.marginLeft]);

  const f = d3.format(".2s");

  return (
    <div className={classes.BarChart}>
      <svg width={dimensions.width} height={1000}>
        {data.map((d, i) => {
          return (
            <g>
              <text
                className={classes.brandName}
                x={dimensions.marginLeft - 10}
                y={i * 30 + 10}
              >
                {d.brand}
              </text>
              <rect
                width={x(d.timeSpent)}
                height={"13px"}
                fill={d.goal > d.timeSpent ? "#EF4A4A" : "#00205C"}
                x={dimensions.marginLeft}
                y={i * 30}
                rx={3}
              />
              <circle
                fill={d.goal > d.timeSpent ? "#4a4a4a" : "#f2f2f2"}
                cx={x(d.goal) + dimensions.marginLeft}
                cy={i * 30 + 6.5}
                r={3}
              />
              <text
                className={classes.numberLabel}
                x={dimensions.boundedWidth + 10}
                y={i * 30 + 10}
              >
                {f(d.timeSpent)}
              </text>
              <foreignObject
                x={dimensions.boundedWidth + 90}
                y={i * 30}
                width={80}
                height={25}
              >
                X<Variance newValue={data.timeSpent} oldValue={data.goal} />
              </foreignObject>
            </g>
          );
        })}
      </svg>
      <Variance newValue={500} oldValue={300} />
    </div>
  );
};

export default withStyles(styles)(BarChart);
