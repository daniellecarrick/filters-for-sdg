import React from "react";
import Card from ".";
export default { title: "Card", component: Card };

export const border = () => (
  <Card border={true}>Example of a card with a border :-)</Card>
);

export const noBorder = () => (
  <Card border={false}>
    Example of card with no border which should be used for non-clickable
    elements
  </Card>
);
