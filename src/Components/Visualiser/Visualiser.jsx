import React, { useState, useEffect } from "react";
import Tone from "tone";
import { initialFFTArray } from "../../data";
import "./Visualiser.css";
import FreqBox from "../FreqBox/FreqBox";

function Visualiser({ enabled, handleVisualiserClick }) {
  const [waveform, setWaveform] = useState(null);
  const [values, setValues] = useState(initialFFTArray);

  useEffect(() => {
    if (!waveform) {
      setWaveform(new Tone.FFT(32));
    }
    waveform && waveform.receive("waveform");
  }, [waveform]);

  useEffect(() => {
    let animationId;
    const getValues = () => {
      const newValues = Array.from(waveform.getValue());
      setValues(newValues);
      // requestAnimationFrame(getValues);
    };
    if (waveform && enabled) animationId = requestAnimationFrame(getValues);
    if (animationId)
      return () => {
        cancelAnimationFrame(animationId);
      };
  }, [enabled, values, waveform]);

  return (
    <div className="waveform" onClick={handleVisualiserClick}>
      {!enabled && <p className="visualiser-text">Click to enable audio visualiser</p>}
      {enabled && (
        <div className="visualiser-box">
          {values.map((freq, index) => {
            freq = freq > -99 ? freq : -99;
            return <FreqBox key={index} freq={freq} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Visualiser;
