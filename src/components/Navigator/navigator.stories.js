import React from "react";
import Navigator from ".";

export default { title: "Navigator" };

const positions = [
  { id: 0, anchor: "section-1", label: "Section 1" },
  { id: 1, anchor: "section-2", label: "Section 2" },
  { id: 2, anchor: "section-3", label: "Section 3" },
  { id: 3, anchor: "section-4", label: "Section 4" },
  { id: 4, anchor: "section-5", label: "Section 5" },
];

export const basic = () => (
  <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
    <Navigator positions={positions} />
    <div
      id="section-1"
      style={{
        marginBottom: "20px",
        width: "80%",
        height: "400px",
        backgroundColor: "lightblue",
      }}
    />
    <div
      id="section-2"
      style={{
        marginBottom: "20px",
        width: "80%",
        height: "400px",
        backgroundColor: "lightblue",
      }}
    />
    <div
      id="section-3"
      style={{
        marginBottom: "20px",
        width: "80%",
        height: "400px",
        backgroundColor: "lightblue",
      }}
    />
    <div
      id="section-4"
      style={{
        marginBottom: "20px",
        width: "80%",
        height: "400px",
        backgroundColor: "lightblue",
      }}
    />
    <div
      id="section-5"
      style={{
        marginBottom: "20px",
        width: "80%",
        height: "400px",
        backgroundColor: "lightblue",
      }}
    />
  </div>
);
