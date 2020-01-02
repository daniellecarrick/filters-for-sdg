import React from "react";
import Dropdown from ".";
import dropdownIcon from "../../resources/images/dropdown.png";

export default { title: "Dropdown", component: Dropdown };

export const basic = ({ content }) => (
  <Dropdown>
    {content}Dropdown Content
    {/* <img src={dropdownIcon} /> */}
  </Dropdown>
);

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
