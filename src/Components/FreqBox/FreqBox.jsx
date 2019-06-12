import React from "react";
import "./FreqBox.css";

function FreqBox({ freq }) {
  freq = Math.trunc(freq * 100);
  const height = `${freq}%`;
  return <div className="freq-box" style={{ height: height }} />;
}

export default FreqBox;
