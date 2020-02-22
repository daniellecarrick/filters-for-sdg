import React from "react";
import DashLogo from ".";

export default { title: "Dash Logo", component: DashLogo };

export const basic = () => <DashLogo />;

export const small = () => <DashLogo height={"10px"} />;
