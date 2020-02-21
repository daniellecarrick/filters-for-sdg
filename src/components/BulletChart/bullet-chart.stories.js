import React from "react";
import BulletChart from ".";

export default { title: "Bullet Chart", component: BulletChart };

const dataLessThanTarget = [
  {
    ranges: [1400],
    measures: [870],
    markers: [1010],
  },
];
const dataMoreThanTarget = [
  {
    ranges: [1400],
    measures: [1010],
    markers: [870],
  },
];
var periodQtr = "Quarter";
var periodMnth = "Month";

export const basic = () => {
  return (
    <>
      <BulletChart data={dataLessThanTarget} period={periodQtr} />
      <BulletChart data={dataMoreThanTarget} period={periodMnth} />
    </>
  );
};
