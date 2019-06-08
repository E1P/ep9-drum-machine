import React, { useState, useEffect } from "react";
import Tone from "tone";
import LevelMeter from "./LevelMeter";

function Sampler({ file, note, trigger, release }) {
  const [amplitude, setAmplitude] = useState(-50);
  const [Sampler, setSampler] = useState(null);
  const [Meter, setMeter] = useState(null);
  const [samplerLoaded, setSamplerLoaded] = useState(false);
  // const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const createSampler = () => {
      setSampler(new Tone.Sampler({ [note]: `./beat-radar-sounds/${file}.wav` }, setSamplerLoaded(true)).toMaster());
    };
    const connectSampler = () => {
      const meter = new Tone.Meter();
      setMeter(meter);
      Sampler.connect(meter);
    };
    !samplerLoaded && createSampler();
    samplerLoaded && !Meter && connectSampler();
  }, [Sampler, Meter, file, note, samplerLoaded]);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === trigger && !event.repeat) Sampler.triggerAttack(note);
    };
    const handleKeyUp = event => {
      if (event.key === trigger) Sampler.triggerRelease(note);
    };
    document.addEventListener("keydown", handleKeyDown);
    release && document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      release && document.removeEventListener("keyup", handleKeyUp);
    };
  }, [Sampler, note, trigger, release]);

  const playSound = () => {
    Sampler.triggerAttackRelease(note);
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
    return () => cancelAnimationFrame(animationId);
  }, [Meter, amplitude]);

  return (
    <div className="sampler">
      <div className={`audition`} onClick={playSound} />
      <LevelMeter level={amplitude} />
    </div>
  );
}

export default Sampler;
