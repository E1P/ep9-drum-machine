import React, { useState, useEffect } from "react";
import Tone from "tone";
import { initialFFTArray } from "../../data";
import "./Visualiser.css";
import FreqBox from "../FreqBox/FreqBox";

function Visualiser() {
  const [waveform, setWaveform] = useState(null);
  const [values, setValues] = useState(initialFFTArray);
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
      const newValues = Array.from(waveform.getValue());
      setValues(newValues);
      requestAnimationFrame(getValues);
    };
    if (waveform && enabled) animationId = requestAnimationFrame(getValues);
    if (animationId)
      return () => {
        cancelAnimationFrame(animationId);
      };
  }, [values, waveform, enabled]);

  return (
    <div className="waveform" onClick={handleClick}>
      {!enabled && <p>Click to toggle audio visualiser</p>}
      {enabled &&
        values.map((freq, index) => {
          freq = freq > -99 ? freq : -99;
          return <FreqBox key={index} freq={freq} />;
        })}
    </div>
  );
}

export default Visualiser;
