import React from "react";
import BrandDropdown from ".";
import { SessionProvider } from "../../context";
import {
  adOpsConfig,
  consumerMarketingConfig,
  affiliateConfig,
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
  <SessionProvider qlikConfig={affiliateConfig}>
    <BrandDropdown
      field="Brand"
      fieldMap={{
        Allure: "ALL",
        "Architectural Digest": "AD",
        "Ars Technica": "ARST",
        "Bon Appetit": "BA",
        Brides: "BRDE",
        "CN Traveler": "CNT",
        Epicurious: "EPIC",
        Glamour: "GLAM",
        "Golf Digest": "GFDG",
        GQ: "GQ",
        Pitchfork: "PTFK",
        Self: "SELF",
        "Teen Vogue": "VOGT",
        "The New Yorker": "TNY",
        Them: "THEM",
        "Vanity Fair": "VF",
        Vogue: "VOG",
        W: "W",
        Wired: "WIRE",
      }}
    />
  </SessionProvider>
);
