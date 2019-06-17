import React, { useState, useEffect } from "react";
import Tone from "tone";
import LevelMeter from "../LevelMeter/LevelMeter";
import "./Sampler.css";

function Sampler({ file, note, trigger, release }) {
  const [amplitude, setAmplitude] = useState(-50);
  const [Sampler, setSampler] = useState(null);
  const [Meter, setMeter] = useState(null);
  const [samplerLoaded, setSamplerLoaded] = useState(false);
  const [depressed, setDepressed] = useState(false);

  useEffect(() => {
    const createSampler = () => {
      setSampler(new Tone.Sampler({ [note]: `./beat-radar-sounds/${file}.wav` }, setSamplerLoaded(true)).toMaster());
    };
    const connectSampler = () => {
      const meter = new Tone.Meter();
      setMeter(meter);
      Sampler.connect(meter);
      Sampler.send("waveform", 0);
    };
    !samplerLoaded && createSampler();
    samplerLoaded && !Meter && connectSampler();
  }, [Sampler, Meter, file, note, samplerLoaded]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === trigger && !event.repeat) {
        Sampler.triggerAttack(note);
        setDepressed(true);
      }
    };
    const handleKeyUp = event => {
      if (event.key === trigger) {
        release && Sampler.triggerRelease(note);
        setDepressed(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [Sampler, note, trigger, release]);

  const handleMouseClick = event => {
    event.preventDefault();
    setDepressed(!depressed);
    !depressed && Sampler.triggerAttackRelease(note);
  };

  const handleMouseLeave = () => {
    setDepressed(false);
  };

  useEffect(() => {
    let animationId;
    const getLevel = () => {
      const level = Math.trunc(Meter.getLevel());
      if (level > -50) setAmplitude(level);
      else if (amplitude !== -50 && level < -50) setAmplitude(-50);
      animationId = requestAnimationFrame(getLevel);
    };
    if (Meter) animationId = requestAnimationFrame(getLevel);
    if (animationId) return () => cancelAnimationFrame(animationId);
  }, [Meter, amplitude]);

  return (
    samplerLoaded && (
      <div
        className={`sampler ${depressed ? "depressed" : ""}`}
        onMouseDown={handleMouseClick}
        onMouseUp={handleMouseClick}
        onMouseLeave={handleMouseLeave}
      >
        <div className="text-container">
          <p>{`${trigger.toUpperCase()}`}</p>
        </div>

        <LevelMeter level={amplitude} />
      </div>
    )
  );
}

export default Sampler;
