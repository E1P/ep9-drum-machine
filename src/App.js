import React, { useState } from "react";
import "./App.css";
import { detectMob } from "./util-functions";
import Sampler from "./Components/Sampler/Sampler";
import MasterOut from "./Components/MasterOut/MasterOut";
import Controls from "./Components/Controls/Controls";
import Visualiser from "./Components/Visualiser/Visualiser";
import LineVisualiser from "./Components/LineVisualiser/LineVisualiser";
import { sounds } from "./data";

function App() {
  const [visualiser, setVisualiser] = useState("line"); // or "box"
  const [enabled, setEnabled] = useState(false);
  const [isMobile] = useState(detectMob());

  const handleVisualiserChange = () => {
    setVisualiser(visualiser === "box" ? "line" : "box");
    setEnabled(enabled);
  };

  const handleVisualiserClick = () => {
    setEnabled(!enabled);
  };

  return (
    <div className="App">
      {isMobile ? (
        "Desktop only. Sorry."
      ) : (
        <div className="main-container">
          <div className="header-container">
            <header className="header">EP-9 Drum Machine</header>
            <div className="menu-container" />
          </div>
          <div className="machine-container">
            <div className="drum-pad">
              {sounds.map((sound, index) => {
                const { file, note, key, release } = sound;
                return <Sampler key={index} file={file} note={note} trigger={key} release={release} />;
              })}
            </div>
            <div className="master-controls-box">
              <Controls visualiser={visualiser} handleVisualiserChange={handleVisualiserChange} />
              <div className="controls-seam-filler" />
              <MasterOut />
            </div>

            {visualiser === "box" && <Visualiser handleVisualiserClick={handleVisualiserClick} enabled={enabled} />}
            {visualiser === "line" && <LineVisualiser handleVisualiserClick={handleVisualiserClick} enabled={enabled} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
