import React from "react";
import "./Controls.css";

const Controls = ({ visualiser, handleVisualiserChange }) => {
  return (
    <div className="control-box">
      <div className="visualiser-toggle" onClick={handleVisualiserChange}>
        {`${visualiser[0].toUpperCase()}${visualiser.slice(1)}`}
      </div>
      <div className="controls-text-box">
        <p className="controls-text">Display</p>
        <p className="controls-text">type</p>
      </div>
    </div>
  );
};

export default Controls;
