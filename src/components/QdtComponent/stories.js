import React from "react";
import QdtComponent from ".";
import { SessionProvider } from "../../context";
import { adOpsConfig } from "../../config";

export default { title: "QDT Component" };

export const basic = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
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
