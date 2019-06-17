import React from "react";
import "./FreqBox.css";

function FreqBox({ freq }) {
  const height = `${2.5 + Math.trunc(99 + freq)}%`;
  return <div className="freq-box" style={{ height: height }} />;
}

export default FreqBox;
