import React from "react";
import DownloadButton from ".";
import { SessionProvider } from "../../context";
import { adOpsConfig } from "../../config";

export default { title: "Download Button", component: DownloadButton };

export const basic = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <DownloadButton downloadIds={["HsZtQjK"]} />
  </SessionProvider>
);
