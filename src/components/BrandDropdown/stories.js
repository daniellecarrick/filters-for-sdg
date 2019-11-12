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

export const singleSelect = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <BrandDropdown field="BrandCD" singleSelect />
  </SessionProvider>
);

export const mapping = () => (
  <SessionProvider qlikConfig={consumerMarketingConfig}>
    <BrandDropdown
      field="PUBLICATION"
      fieldMap={{
        Allure: "ALL",
        "Architectural Digest": "AD",
        "Ars Technica": "ARST",
        "Bon Appetit": "BA",
        Brides: "BRDE",
        "Conde Nast Traveler": "CNT",
        Epicurious: "EPIC",
        Glamour: "GLAM",
        "Golf Digest": "GFDG",
        GQ: "GQ",
        Pitchfork: "PTFK",
        SELF: "SELF",
        "Teen Vogue": "VOGT",
        "The New Yorker": "TNY",
        "Vanity Fair": "VF",
        Vogue: "VOG",
        W: "W",
        Wired: "WIRE",
      }}
    />
  </SessionProvider>
);
