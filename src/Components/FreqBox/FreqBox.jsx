import React from "react";
import "./FreqBox.css";

function FreqBox({ freq }) {
  const height = `${1 + Math.trunc(99 + freq)}%`;
  return <div className="freq-box" style={{ height: height }} />;
}

export default FreqBox;
