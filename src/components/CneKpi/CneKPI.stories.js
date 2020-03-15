import React from "react";
import CneKPI from ".";
export default { title: "CNE KPI", component: CneKPI };

export const normal = () => (
  <>
    <CneKPI value={480032334} oldValue={345656000} label={"Sample KPI"} />
  </>
);

export const dollar = () => (
  <>
    <CneKPI
      value={480032334}
      oldValue={345656000}
      label={"Sample KPI"}
      dollar={true}
    />
  </>
);
export const large = () => (
  <>
    <CneKPI
      value={99}
      oldValue={64}
      label={"Sample KPI"}
      dollar={true}
      kpiLarge={true}
      percentageValue={99}
    />
  </>
);