import React from "react";
import BrandDropdown from ".";
import { SessionProvider } from "../../context";
import {
  adOpsConfig,
  consumerMarketingConfig,
  socialConfig,
} from "../../config";

export default { title: "Brand Dropdown", component: BrandDropdown };

export const basic = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <BrandDropdown field="BrandCD" />
  </SessionProvider>
);

export const singleSelect = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <BrandDropdown field="BrandCD" singleSelect />
  </SessionProvider>
);

export const mapping = () => (
  <SessionProvider qlikConfig={socialConfig}>
    <BrandDropdown
      field="brand"
      fieldMap={{
        Allure: "ALL",
        "Architectural Digest": "AD",
        "Ars Technica": "ARST",
        "Bon Appetit": "BA",
        "CN Traveler": "CNT",
        Epicurious: "EPIC",
        Glamour: "GLAM",
        GQ: "GQ",
        Pitchfork: "PTFK",
        Self: "SELF",
        "Teen Vogue": "VOGT",
        "The New Yorker": "TNY",
        Them: "THEM",
        "Vanity Fair": "VF",
        Vogue: "VOG",
        Wired: "WIRE",
      }}
    />
  </SessionProvider>
);
