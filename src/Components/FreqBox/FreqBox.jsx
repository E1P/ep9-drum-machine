import React from "react";
import "./FreqBox.css";

function FreqBox({ freq }) {
  freq = 1 + Math.trunc(99 + freq);
  const height = `${freq}%`;
  return <div className="freq-box" style={{ height: height }} />;
}

export default FreqBox;
