import React, { useState } from "react";
import DashMenu from ".";
import { MenuDrawer } from "../index";
import { List, ListItem, Drawer } from "@material-ui/core";
import * as brandImages from "../../resources/images/brands";
import { cmExecDashConfig } from "../../config";
import { SessionProvider } from "../../context";

export default { title: "Dash Menu", component: DashMenu };

export const homePage = () => (
  <DashMenu className={"class-name"} title={"Dashboard Title"} />
);

export const brandPage = () => (
  <DashMenu className={"class-name"} title={brandImages["WIREBLACK"]} />
);

export const withDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <SessionProvider qlikConfig={cmExecDashConfig}>
      <DashMenu
        className={"class-name"}
        state={[openDrawer, setOpenDrawer]}
      ></DashMenu>
      <MenuDrawer state={[openDrawer, setOpenDrawer]}>
        {["Wired", "The New Yorker", "Vanity Fair"].map((item, i) => {
          return <ListItem>{item}</ListItem>;
        })}
      </MenuDrawer>
    </SessionProvider>
  );
};
