import React from "react";
import QlikFilter from ".";
import { SessionProvider } from "../../context";
import { affiliateConfig } from "../../config";

export default { title: "Qlik Filter", component: QlikFilter };

export const basic = () => (
  <SessionProvider qlikConfig={affiliateConfig}>
    <QlikFilter fieldName="Network" displayName="Network" />
  </SessionProvider>
);
