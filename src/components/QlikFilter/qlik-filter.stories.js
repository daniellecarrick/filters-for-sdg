import React from "react";
import QlikFilter from ".";
import { SessionProvider } from "../../context";
import { adOpsConfig } from "../../config";

export default { title: "Qlik Filter", component: QlikFilter };

export const basic = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <QlikFilter fieldName="BrandCD" displayName="Brand" />
  </SessionProvider>
);
