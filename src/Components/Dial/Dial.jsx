import React from "react";
import "./Dial.css";

const Dial = ({ name, handleWheel, min, max, current }) => {
  const rotationPercentage = (Math.abs(current) / (max - min)) * 100;

  const rotation = 330 - 3 * rotationPercentage;

  return (
    <div className="dial-box">
      <div className="dial-outer">
        <div className="dial" onWheel={handleWheel}>
          <svg width="66" height="66">
            <line
              x1="33"
              y1="33"
              x2="33"
              y2="66"
              fillOpacity="0"
              stroke="rgb(179, 108, 17)"
              strokeLinecap="round"
              strokeWidth="3"
              transform={`rotate(${rotation},33,33)`}
            />
          </svg>
        </div>
      </div>
      <p className="dial-text">{`${name}`}</p>
    </div>
  );
};

export default Dial;
