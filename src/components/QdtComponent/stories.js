import React from "react";
import QdtComponent from ".";
import { SessionProvider } from "../../context";
import { adOpsConfig } from "../../config";

export default { title: "QDT Component" };
// const prefix = window.location.pathname.substr(
//   0,
//   window.location.pathname.toLowerCase().lastIndexOf("/extensions")
// );
const prefix = "/dev";

const qlikConfigWithPrefix = {
  ...adOpsConfig,
  prefix,
};
export const basic = () => (
  <SessionProvider qlikConfig={qlikConfigWithPrefix}>
    <QdtComponent
      type="QdtViz"
      qdtProps={{
        type: "linechart",
        id: "jxkatw",
        height: "300px",
      }}
    />
  </SessionProvider>
);
