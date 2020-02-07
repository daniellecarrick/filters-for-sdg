import React from "react";
import Variance from ".";
export default { title: "Variance", component: Variance };
export const basic = () => (
  <>
    <Variance newValue={4800} oldValue={6000} />
    <Variance newValue={8800} oldValue={6000} />
  </>
);
