import React from "react";
import ClearButton from ".";
import { SessionProvider } from "../../context";
import { adOpsConfig } from "../../config";

export default { title: "Clear Button", component: ClearButton };

export const basic = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <ClearButton />
  </SessionProvider>
);
