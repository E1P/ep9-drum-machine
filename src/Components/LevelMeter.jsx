import React from "react";
import "./LevelMeter.css";

const LevelMeter = ({ level }) => {
  const levelPercent = (50 + level) * 2;
  // console.log("Level: ", levelPercent);
  return (
    <div className="meter-box">
      <div className="level" style={{ height: levelPercent }} />
    </div>
  );
};

export default LevelMeter;
