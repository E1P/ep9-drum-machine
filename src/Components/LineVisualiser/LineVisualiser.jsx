import React, { useState, useEffect } from "react";
import Tone from "tone";
import "./LineVisualiser.css";

function LineVisualiser({ enabled, handleVisualiserClick }) {
  const [waveform, setWaveform] = useState(null);
  const [freqLine, setFreqLine] = useState("350 650");
  // const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    console.log("setting waveform");
    if (!waveform) {
      setWaveform(new Tone.FFT(32));
      console.log("waveform node >>> ", waveform);
    }
    waveform && waveform.receive("waveform");
  }, [waveform]);

  // const handleClick = () => {
  //   setEnabled(!enabled);
  //   console.log(enabled, `Visualiser ${enabled ? "on" : "off"}`);
  // };

  useEffect(() => {
    let animationId;
    const getValues = () => {
      const values = Array.from(waveform.getValue());
      const lineString = values
        .map((freq, index) => {
          const y = freq > -99 ? 350 - (Math.trunc(freq) + 99) * 3.5 : 340;
          const x = index * 20 + 7;
          return `${x},${y}`;
        })
        .join(" ");
      setFreqLine(`1,340 ${lineString} 637, 340`);
      requestAnimationFrame(getValues);
    };
    if (waveform && enabled) animationId = requestAnimationFrame(getValues);
    if (animationId)
      return () => {
        cancelAnimationFrame(animationId);
      };
  }, [waveform, enabled]);

  return (
    <div className="waveform" onClick={handleVisualiserClick}>
      {!enabled && <p>Click to toggle audio visualiser</p>}
      {enabled && (
        <div className="waveform">
          <svg width="646" height="346">
            <polyline
              points={freqLine}
              shapeRendering="auto"
              fill="white"
              fillOpacity="0.5"
              fillRule="nonzero"
              stroke="white"
              stroke-width="5"
              // stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default LineVisualiser;
