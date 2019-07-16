import React from "react";
import "./MenuModal.css";
import { sounds } from "../../data";
import { ReactComponent as GithubLogo } from "../../images/github-icon.svg";
import { ReactComponent as LinkedInLogo } from "../../images/iconmonstr-linkedin-3.svg";

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
                {<p>{sound.file.replace("-", " ")}</p>}
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
          <div className="dm-info-controls">
            <p className="dm-info-display">Click to toggle between FFT analysis visualisations</p>
            <p className="dm-info-volume">Hover over and use scrollwheel or trackpad to adjust volume</p>
            <p className="dm-info-mute">Click to mute/unmute audio</p>
          </div>
          <p className="dm-info-2">
            Built using:
            <p>
              <br />
              <br />
              <ul>
                <li>React.js</li>
                <br />
                <li>
                  <a href="https://tonejs.github.io/" target="_blank" rel="noopener noreferrer">
                    Tone.js
                  </a>
                </li>
                <br />
                <li>CSS</li>
              </ul>
              <br />
            </p>
            <div className="flex-spacer" />
          </p>
          <div className="dm-info-links-container">
            <a href="https://github.com/E1P/ep9-drum-machine" target="_blank" rel="noopener noreferrer">
              <GithubLogo height="40" width="40" fill="white" />
            </a>
            <a href="https://uk.linkedin.com/in/ewan-pearce" target="_blank" rel="noopener noreferrer">
              <LinkedInLogo height="40" width="40" fill="white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
