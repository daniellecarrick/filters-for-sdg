import React from "react";
import Variance from ".";
export default { title: "Variance", component: Variance };

export const negative = () => (
  <>
    <Variance newValue={4800} oldValue={6000} />
  </>
);

export const positive = () => (
  <>
    <Variance newValue={8800} oldValue={6000} highColor={"#126274"} />
  </>
);
