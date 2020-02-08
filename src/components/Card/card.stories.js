import React from "react";
import Card from ".";
import { Variance } from "..";
import * as brands from "../../resources/images/brands";

export default { title: "Exec Dash Card", component: Card };

export const basic = () => <Card>Put some stuff in the card</Card>;

export const kpiExample = () => (
  <Card>
    <img src={brands["WIREBLACK"]} />
    <Variance oldValue={100} newValue={90} />
    <Variance oldValue={90} newValue={100} />
  </Card>
);
