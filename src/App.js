import React, { useState, useEffect } from "react";
import "./App.css";
import Tone from "tone";
import LevelMeter from "./Components/LevelMeter";

function App() {
  console.log("Mounting...");
  const [amplitude, setAmplitude] = useState(-50);
  const [playing, setPlaying] = useState(false);
  const [Sampler, setSampler] = useState(null);
  const [Meter, setMeter] = useState(null);

  useEffect(() => {
    console.log("Sampler useEffect triggered...");
    !Sampler && setSampler(new Tone.Sampler({ C3: "./beat-radar-sounds/stab.wav" }).toMaster());
    !Meter && setMeter(new Tone.Meter());
    Sampler && Meter && Sampler.connect(Meter);
  }, [Sampler, Meter]);

  const playSound = note => {
    Sampler.triggerAttack("C3");
  };

  const handleKeyDown = event => {
    if (!playing && event.key === "a") {
      Sampler.triggerAttack("C3");
      setPlaying(true);
    }
  };

  const handleKeyUp = event => {
    if (playing && event.key === "a") {
      Sampler.triggerRelease("C3");
      setPlaying(false);
    }
  };

  useEffect(() => {
    console.log("render!!!");
    const getLevel = () => {
      const level = Math.trunc(Meter.getLevel());
      if (level > -50) setAmplitude(level);
      requestAnimationFrame(getLevel);
    };
    Meter && requestAnimationFrame(getLevel);
    // return;
  }, [Meter]);

  return (
    <div className="App" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
      <button onClick={playSound}>BEATS!</button>
      <LevelMeter level={amplitude} />
    </div>
  );
}

export default App;
