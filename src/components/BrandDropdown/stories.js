import React from "react";
import BrandDropdown from ".";
import { SessionProvider } from "../../context";
import { adOpsConfig, consumerMarketingConfig } from "../../config";

export default { title: "Brand Dropdown" };

export const basic = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <BrandDropdown field="BrandCD" />
  </SessionProvider>
);
