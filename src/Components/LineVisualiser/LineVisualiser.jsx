import React, { useState, useEffect } from "react";
import Tone from "tone";
import "./LineVisualiser.css";

function LineVisualiser({ enabled, handleVisualiserClick }) {
  const [waveform, setWaveform] = useState(null);
  const [valuesArray, setValuesArray] = useState([]);
  const [freqLine, setFreqLine] = useState("350 650");

  useEffect(() => {
    if (!waveform) {
      setWaveform(new Tone.FFT(32));
    }
    waveform && waveform.receive("waveform");
  }, [waveform]);

  useEffect(() => {
    let animationId;
    const getValues = () => {
      const values = Array.from(waveform.getValue());
      setValuesArray([values, ...valuesArray.slice(0, 2)]);
      // get average values from valuesArray
      const lineString = values
        .map((freq, index) => {
          const y = freq > -99 ? 350 - (Math.trunc(freq) + 100) * 3.5 : 344;
          const x = index * 20.51 + 4;
          return `${x},${y}`;
        })
        .join(" ");
      setFreqLine(`5,345 ${lineString} 641,345 5,345`);
      requestAnimationFrame(getValues);
    };
    if (waveform && enabled) animationId = requestAnimationFrame(getValues);
    if (animationId)
      return () => {
        cancelAnimationFrame(animationId);
      };
  }, [waveform, enabled, valuesArray]);

  return (
    <div className="waveform" onClick={handleVisualiserClick}>
      {!enabled && <p>Click to toggle audio visualiser</p>}
      {enabled && (
        <div /* className="waveform" */>
          <svg width="646" height="345" className="svg-container">
            <defs>
              <linearGradient id="fill-gradient" x1="0" x2="0" y1="1" y2="0">
                {/* gradient co-ords */}
                <stop offset="0" stop-color="white" />
                <stop offset="1" stop-color="red" />
              </linearGradient>
            </defs>
            <polyline
              className="polyline-one"
              points={freqLine}
              shapeRendering="auto"
              fill="url(#fill-gradient)"
              fillOpacity="0.5"
              stroke="red"
              strokeWidth="3"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default LineVisualiser;
