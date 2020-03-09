import React from "react";
import DonutChart from ".";

export default { title: "Donut Chart", component: DonutChart };
const data = [
  {
    type: "Unauthenticated",
    value: 4800,
  },
  {
    type: "Authenticated",
    value: 420,
  },
  {
    type: "Self Authenticated ",
    value: 3705,
  },
];
var colors = ["#55B1F3", "#3A66BB", "#C4C4C4"];
const legendData = [
  {
    type: "Unauthenticated",
    value: 4800,
    oldValue: 2600,
  },
  {
    type: "Authenticated",
    value: 420,
    oldValue: 1600,
  },
  {
    type: "Self Authenticated ",
    value: 3705,
  },
];
export const basic = () => (
  <DonutChart
    data={data}
    outerRadius={90}
    innerRadius={60}
    colors={colors}
    legendData={legendData}
  />
);
