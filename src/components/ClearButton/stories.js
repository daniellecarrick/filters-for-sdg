import React from "react";
import ClearButton from ".";
import { SessionProvider } from "../../context";
import { qlikConfig } from "../../config";

export default { title: "Clear Button" };

export const basic = () => (
  <SessionProvider qlikConfig={qlikConfig}>
    <ClearButton />
  </SessionProvider>
);
