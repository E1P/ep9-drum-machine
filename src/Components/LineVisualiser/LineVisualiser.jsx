import React, { useState, useEffect } from "react";
import Tone from "tone";
import "./LineVisualiser.css";

function LineVisualiser() {
  const [waveform, setWaveform] = useState(null);
  const [freqLine, setFreqLine] = useState("350 650");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    console.log("setting waveform");
    if (!waveform) {
      setWaveform(new Tone.FFT(32));
      console.log("waveform node >>> ", waveform);
    }
    waveform && waveform.receive("waveform");
  }, [waveform]);

  const handleClick = () => {
    setEnabled(!enabled);
    console.log(enabled, `Visualiser ${enabled ? "on" : "off"}`);
  };

  useEffect(() => {
    let animationId;
    const getValues = () => {
      const values = Array.from(waveform.getValue());
      const lineString = values
        .map((freq, index) => {
          const y = freq > -99 ? 350 - (Math.trunc(freq) + 99) * 3.5 : 350;
          const x = index * 20 + 7;
          return `${x},${y}`;
        })
        .join(" ");
      setFreqLine(`0,350 ${lineString} 650, 350`);
      requestAnimationFrame(getValues);
    };
    if (waveform && enabled) animationId = requestAnimationFrame(getValues);
    if (animationId)
      return () => {
        cancelAnimationFrame(animationId);
      };
  }, [waveform, enabled]);

  return (
    <div className="waveform" onClick={handleClick}>
      {!enabled && <p>Click to toggle audio visualiser</p>}
      {enabled && (
        <div className="waveform">
          <svg width="650" height="350">
            <polyline
              points={freqLine}
              shapeRendering="auto"
              fill="white"
              fillOpacity="0.5"
              fillRule="nonzero"
              stroke="white"
              stroke-width="5"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default LineVisualiser;
