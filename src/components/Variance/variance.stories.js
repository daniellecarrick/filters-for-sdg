import React from "react";
import Variance from ".";
export default { title: "Variance", component: Variance };

const colors = [{ up: "#126274" }, { down: "#EF4A4A" }];

export const negative = () => (
  <>
    <Variance
      newValue={4800}
      oldValue={6000}
      colorUp={"#126274"}
      colorDown={"#EF4A4A"}
    />
  </>
);

export const positive = () => (
  <>
    <Variance
      newValue={8800}
      oldValue={6000}
      colorUp={"#126274"}
      colorDown={"#EF4A4A"}
    />
  </>
);
