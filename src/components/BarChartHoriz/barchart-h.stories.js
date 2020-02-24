import React from "react";
import BarChartHoriz from ".";
import { SessionProvider } from "../../context";
import { cneConfig } from "../../config";

export default { title: "Bar Chart Horizontal", component: BarChartHoriz };

export const basic = () => (
  <SessionProvider qlikConfig={cneConfig}>
    <BarChartHoriz />
  </SessionProvider>
);
