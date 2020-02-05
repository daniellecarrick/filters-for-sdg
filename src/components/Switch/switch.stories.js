import React, { useState } from "react";
import Switch from ".";

export default { title: "Switch", component: Switch };

export const basic = () => <Switch />;

export const controlledState = () => {
  const [state, setState] = useState("left");

  return (
    <Switch
      labelLeft="Left"
      valueLeft="left"
      labelRight="Right"
      valueRight="right"
      state={[state, setState]}
    />
  );
};
