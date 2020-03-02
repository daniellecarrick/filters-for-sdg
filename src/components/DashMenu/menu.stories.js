import React, { useState } from "react";
import DashMenu from ".";
import { MenuDrawer } from "../index";
import { ListItem } from "@material-ui/core";
import * as brandImages from "../../resources/images/brands";
import { cmExecDashConfig } from "../../config";
import { SessionProvider } from "../../context";
import CMCalendar from "../Calendar";
import moment from "moment";

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
          return <ListItem key={i}>{item}</ListItem>;
        })}
      </MenuDrawer>
    </SessionProvider>
  );
};

export const withCalendar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [date, setDate] = useState(moment().format("MMM. DD, YYYY"));
  const getDateString = date => {
    setDate(moment(date).format("MMM. DD, YYYY"));
  };
  return (
    <SessionProvider qlikConfig={cmExecDashConfig}>
      <DashMenu
        className={"class-name"}
        state={[openDrawer, setOpenDrawer]}
        dateString={date}
        calendar={<CMCalendar getDate={getDateString} />}
      ></DashMenu>
      <MenuDrawer state={[openDrawer, setOpenDrawer]}>
        {["Wired", "The New Yorker", "Vanity Fair"].map((item, i) => {
          return <ListItem key={i}>{item}</ListItem>;
        })}
      </MenuDrawer>
    </SessionProvider>
  );
};
