import React from "react";
import DonutChart from ".";
import { SessionProvider } from "../../context";

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
export const basic = () => <DonutChart data={data} />;
