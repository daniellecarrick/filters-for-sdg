import React from "react";
import Menu from ".";
import * as brandImages from "../../resources/images/brands";
import { cmExecDashConfig } from "../../config";
import { SessionProvider } from "../../context";

export default { title: "Menu", component: Menu };

export const homePage = () => (
  <Menu className={"class-name"} title={"Dashboard Title"} />
);

export const brandPage = () => (
  <Menu className={"class-name"} title={brandImages["WIREBLACK"]} />
);

export const withFilters = () => (
  <SessionProvider qlikConfig={cmExecDashConfig}>
    <Menu className={"class-name"} />
  </SessionProvider>
);
