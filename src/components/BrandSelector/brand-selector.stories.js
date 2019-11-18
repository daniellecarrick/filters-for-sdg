import React, { useState } from "react";
import BrandSelector from ".";
import { SessionProvider } from "../../context";
import { adOpsConfig, consumerMarketingConfig } from "../../config";

export default { title: "Brand Selector", component: BrandSelector };

export const basic = () => {
  const [selectedBrand, setSelectedBrand] = useState("-");

  return (
    <SessionProvider qlikConfig={adOpsConfig}>
      <div>Selected Brand: {selectedBrand}</div>
      <div style={{ backgroundColor: "#343a40", display: "inline-block" }}>
        <BrandSelector field="BrandCD" setSelectedBrand={setSelectedBrand} />
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
  <SessionProvider qlikConfig={consumerMarketingConfig}>
    <div style={{ backgroundColor: "#343a40", display: "inline-block" }}>
      <BrandSelector
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
    </div>
  </SessionProvider>
);
