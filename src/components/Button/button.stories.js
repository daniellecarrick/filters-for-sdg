import React from "react";
import Button from ".";
import downloadIcon from "../../resources/images/download.svg";

export default { title: "Button", component: Button };

export const basic = () => <Button>Button</Button>;

export const light = () => <Button theme="light">Button</Button>;

export const size = () => <Button size="lg">Button</Button>;

export const icon = () => (
  <Button>
    Download <img src={downloadIcon} />
  </Button>
);

export const click = () => (
  <Button onClick={() => alert("Clicked")}>Click Me</Button>
);
