import React, { useState, useEffect } from "react";
import Tone from "tone";
import "./Visualiser.css";
import FreqBox from "../FreqBox/FreqBox";

function Visualiser() {
  const initialValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [waveform, setWaveform] = useState(null);
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (!waveform) {
      setWaveform(new Tone.Waveform(32));
    }
    waveform && waveform.receive("waveform");
  }, [waveform]);

  useEffect(() => {
    let animationId;
    const getValues = () => {
      const newValues = waveform.getValue();
      setValues(Array.from(newValues));
      requestAnimationFrame(getValues);
    };
    if (waveform) {
      animationId = requestAnimationFrame(getValues);
    }
    return () => cancelAnimationFrame(animationId);
  }, [values, waveform]);

  return (
    <div className="waveform">
      {values.map((freq, index) => {
        return <FreqBox key={index} freq={freq} />;
      })}
    </div>
  );
}

export default Visualiser;
