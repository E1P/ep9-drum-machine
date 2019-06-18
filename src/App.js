import React, { useState } from "react";
import "./App.css";
import { detectMob } from "./util-functions";
import Header from "./Components/Header/Header";
import Sampler from "./Components/Sampler/Sampler";
import MasterOut from "./Components/MasterOut/MasterOut";
import Controls from "./Components/Controls/Controls";
import Visualiser from "./Components/Visualiser/Visualiser";
import LineVisualiser from "./Components/LineVisualiser/LineVisualiser";
import MenuModal from "./Components/MenuModal/MenuModal";
import { sounds } from "./data";
import image from "./images/eP9drumMachine.png";

function App() {
  const [visualiser, setVisualiser] = useState("box"); // or "line"
  const [enabled, setEnabled] = useState(false);
  const [isMobile] = useState(detectMob());
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const handleVisualiserChange = () => {
    setVisualiser(visualiser === "box" ? "line" : "box");
    setEnabled(enabled);
  };

  const handleVisualiserClick = () => {
    setEnabled(!enabled);
  };

  const handleMenuToggle = () => {
    setMenuIsVisible(!menuIsVisible);
  };

  return (
    <div className="App" onClick={menuIsVisible ? () => setMenuIsVisible(false) : null}>
      {isMobile ? (
        <div className="non-desktop">
          <p className="app-text">Desktop only. Sorry.</p>
          <img src={image} alt="Drum machine" width="90%" />
        </div>
      ) : (
        <div className="main-container">
          <Header handleMenuToggle={handleMenuToggle} visible={menuIsVisible} />
          <div className={`machine-container`}>
            <div className="drum-pad">
              {sounds.map((sound, index) => {
                const { file, note, key, release } = sound;
                return <Sampler key={index} file={file} note={note} trigger={key} release={release} />;
              })}
            </div>
            <div className="master-controls-box">
              <Controls visualiser={visualiser} handleVisualiserChange={handleVisualiserChange} />
              <div className="controls-seam-filler">{}</div>
              <MasterOut />
            </div>
            {visualiser === "box" && <Visualiser handleVisualiserClick={handleVisualiserClick} enabled={enabled} />}
            {visualiser === "line" && <LineVisualiser handleVisualiserClick={handleVisualiserClick} enabled={enabled} />}
            <MenuModal visible={menuIsVisible} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
