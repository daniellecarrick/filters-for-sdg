import React, { useState } from "react";
import ButtonGroup from ".";

export default { title: "Button Group" };

const buttons = [
  { name: "apple", label: "Apple" },
  { name: "orange", label: "Orange" },
  { name: "banana", label: "Banana" },
];

export const basic = () => <ButtonGroupGenerator />;

export const large = () => <ButtonGroupGenerator size="lg" />;

const ButtonGroupGenerator = ({ size }) => {
  const [selectedButton, setSelectedButton] = useState("apple");

  return (
    <ButtonGroup
      buttons={buttons}
      selectedButton={selectedButton}
      onChange={setSelectedButton}
      size={size}
    />
  );
};
