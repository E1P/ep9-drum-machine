import React from "react";
import "./Controls.css";

const Controls = ({ visualiser, handleVisualiserChange }) => {
  return (
    <div className="control-box">
      <div className="visualiser-toggle" onClick={handleVisualiserChange}>
        {visualiser.toUpperCase()}
      </div>
    </div>
  );
};

export default Controls;
