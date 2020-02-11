import React from "react";
import BulletChart from ".";

export default { title: "Bullet Chart", component: BulletChart };

const data = [
  {
    ranges: [1400],
    measures: [870],
    markers: [1010],
  },
];
var period = "Quarter";

export const basic = () => {
  return <BulletChart data={data} period={period} />;
};
