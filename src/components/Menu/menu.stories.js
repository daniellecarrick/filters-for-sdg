import React from "react";
import Menu from ".";
import * as brandImages from "../../resources/images/brands";

export default { title: "Menu", component: Menu };

export const homePage = () => (
  <Menu className={"class-name"} title={"Dashboard Title"} />
);
console.log(brandImages["WIRE"]);
export const brandPage = () => (
  <Menu className={"class-name"} title={brandImages["WIREBLACK"]} />
);

export const withFilters = () => <Menu className={"class-name"} />;
