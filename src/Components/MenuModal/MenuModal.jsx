import React from "react";
import "./MenuModal.css";
import { sounds } from "../../data";

const MenuModal = ({ visible }) => {
  return (
    <div className={`modal-container ${visible ? "" : "hidden"}`}>
      <div className="header-container">
        <header className="dm-header">EP-9 Drum Machine</header>
      </div>
      <div className="dm-outline">
        <div className="drumpad-outline">
          {sounds.map(sound => {
            return (
              <div key={sound.file} className="sampler-outline">
                {/* {<p>{sound.file.replace("-", " ")}</p>} */}
              </div>
            );
          })}
        </div>
        <div className="controls-master-outline">
          <div className="button-outline" />
          <div className="dial-outline" />
          <div className="button-outline" />
        </div>
        <div className="dm-info">
          <p className="dm-info-1">
            Keys:
            <br />
            R: Kick
            <br />
            T: Snare
            <br />
            Y: Hi-Hat
            <br />
            F: Open Hi-Hat
            <br />
            G: Woodblock
            <br />
            H: Cymbal
            <br />
            V: Strings
            <br />
            B: Stab
            <br />
            N: Bass
          </p>
          <p className="dm-info-2">
            <a href="https://github.com/E1P/ep9-drum-machine" target="_blank" rel="noopener noreferrer">
              Github Repo
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
