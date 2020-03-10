import React from "react";
import DonutChart from ".";

export default { title: "Donut Chart", component: DonutChart };
const data = [
  {
    type: "Indirect",
    value: 4800,
  },
  {
    type: "Direct",
    value: 4200,
  },
  {
    type: "Oppertunity",
    value: 3705,
  },
];
var colors = ["#FFA600", "#00568E", "#E0E0E0"];
const legendData = [
  {
    type: "Indirect",
    value: 4800,
    oldValue: 2600,
    percentageValue: 87,
  },
  {
    type: "Direct",
    value: 4200,
    oldValue: 8600,
    percentageValue: 76,
  },
  {
    type: "Oppertunity",
    value: 3705,
    percentageValue: 48,
  },
];
export const basic = () => (
  <DonutChart
    data={data}
    outerRadius={40}
    innerRadius={20}
    colors={colors}
    legendData={legendData}
  />
);
