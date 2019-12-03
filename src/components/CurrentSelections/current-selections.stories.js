import React from "react";
import { BrandDropdown } from "..";
import CurrentSelections from ".";
import { SessionProvider } from "../../context";
import { adOpsConfig } from "../../config";

export default { title: "Current Selections", component: CurrentSelections };

export const basic = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <div style={{ width: "100%", height: "60px", backgroundColor: "white" }}>
      Current Selections:
      <CurrentSelections />
    </div>
    <BrandDropdown field="BrandCD" />
  </SessionProvider>
);
