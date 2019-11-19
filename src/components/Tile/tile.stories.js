import React from "react";
import Tile from ".";
import { QdtComponent } from "..";
import { SessionProvider } from "../../context";
import { adOpsConfig } from "../../config";

export default { title: "Tile", component: Tile };

export const basic = () => <Tile>content</Tile>;

export const title = () => <Tile title="Tile">content</Tile>;

export const footer = () => (
  <Tile title="Tile" footer={"Data Source"}>
    content
  </Tile>
);

export const qlik = () => (
  <SessionProvider qlikConfig={adOpsConfig}>
    <Tile title="Tile" downloadIds={["jxkatw"]}>
      <QdtComponent
        type="QdtViz"
        qdtProps={{
          type: "linechart",
          id: "jxkatw",
          height: "300px",
        }}
      />
    </Tile>
  </SessionProvider>
);
