import React, { useState } from "react";
import BrandSelector from ".";
import { SessionProvider } from "../../context";
import {
  adOpsConfig,
  consumerMarketingConfig,
  socialConfig,
} from "../../config";

export default { title: "Brand Selector", component: BrandSelector };

export const basic = () => {
  const [selectedBrand, setSelectedBrand] = useState("-");

  return (
    <SessionProvider qlikConfig={socialConfig}>
      <div>Selected Brand: {selectedBrand}</div>
      <div style={{ backgroundColor: "#343a40", display: "inline-block" }}>
        <BrandSelector field="brand" setSelectedBrand={setSelectedBrand} />
      </div>
    </SessionProvider>
  );
};

export const singleSelect = () => {
  const [selectedBrand, setSelectedBrand] = useState("-");

  return (
    <SessionProvider qlikConfig={adOpsConfig}>
      <div>Selected Brand: {selectedBrand}</div>
      <div style={{ backgroundColor: "#343a40", display: "inline-block" }}>
        <BrandSelector
          field="BrandCD"
          singleSelect
          setSelectedBrand={setSelectedBrand}
        />
      </div>
    </SessionProvider>
  );
};

export const mapping = () => (
  <SessionProvider qlikConfig={socialConfig}>
    <div style={{ backgroundColor: "#343a40", display: "inline-block" }}>
      <BrandSelector
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
    </div>
  </SessionProvider>
);
