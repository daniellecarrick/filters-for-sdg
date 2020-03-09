import React from "react";
import BarChart from ".";
import { SessionProvider } from "../../context";
import { cneConfig } from "../../config";
import { useChartDimensions } from "../../hooks/useChartDimensions";

export default { title: "Bar Chart Pacing", component: BarChart };

export const basic = data => {
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 0,
    marginRight: 30,
    marginLeft: 100,
    marginTop: 60,
  });

  return (
    <SessionProvider qlikConfig={cneConfig}>
      <div ref={ref}>
        <BarChart data={data} dimensions={dimensions} />
      </div>
    </SessionProvider>
  );
};
