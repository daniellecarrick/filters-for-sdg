import React from "react";
import Dropdown from ".";

export default { title: "Dropdown", component: Dropdown };

export const basic = () => <Dropdown>Dropdown Content</Dropdown>;

export const dropdownButtonChildren = () => (
  <Dropdown dropdownButtonChildren="Dropdown Text">Dropdown Content</Dropdown>
);

export const customButton = () => (
  <Dropdown
    DropdownButton={({ onClick }) => (
      <button onClick={onClick}>Custom dropdown</button>
    )}
  >
    Dropdown Content
  </Dropdown>
);
