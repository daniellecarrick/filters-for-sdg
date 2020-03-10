import React from "react";
import BarChart from ".";
import { useChartDimensions } from "../../hooks/useChartDimensions";
import * as d3 from "d3";
import BarLegend from "./BarLegend";

export default { title: "Bar Chart Pacing", component: BarChart };

export const withVariance = () => {
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 0,
    marginRight: 15,
    marginLeft: 100,
    marginTop: 60,
  });

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

  const barValueAccessor = d => d.timeSpent;
  const benchmarkAccessor = d => d.goal;
  const labelAccessor = d => d.brand;

  return (
    <div ref={ref}>
      <BarChart
        data={data}
        label={labelAccessor}
        barValue={barValueAccessor}
        benchmark={benchmarkAccessor}
        dimensions={dimensions}
        varianceAccessor1={barValueAccessor}
        varianceAccessor2={benchmarkAccessor}
      />
    </div>
  );
};

export const withoutVariance = () => {
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 0,
    marginRight: 0,
    marginLeft: 100,
    marginTop: 60,
  });

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

  const barValueAccessor = d => d.timeSpent;
  const benchmarkAccessor = d => d.goal;
  const labelAccessor = d => d.brand;

  return (
    <div ref={ref}>
      <BarLegend />
      <BarChart
        data={data}
        label={labelAccessor}
        barValue={barValueAccessor}
        benchmark={benchmarkAccessor}
        variance={false}
        dimensions={dimensions}
        varianceAccessor1={barValueAccessor}
        varianceAccessor2={benchmarkAccessor}
      />
    </div>
  );
};
