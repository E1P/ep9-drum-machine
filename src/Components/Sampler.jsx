import React, { useState, useEffect } from "react";
import Tone from "tone";
import LevelMeter from "./LevelMeter";

function Sampler({ file, note, trigger }) {
  const [amplitude, setAmplitude] = useState(-50);
  const [Sampler, setSampler] = useState(null);
  const [Meter, setMeter] = useState(null);
  const [samplerLoaded, setSamplerLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // console.log("Sampler useEffect triggered...");
    const createSampler = () => {
      setSampler(new Tone.Sampler({ [note]: `./beat-radar-sounds/${file}.wav` }, setSamplerLoaded(true)).toMaster());
    };

    !samplerLoaded && createSampler();
  }, [file, note, samplerLoaded]);

  useEffect(() => {
    // console.log("Meter useEffect triggered...");
    const connectSampler = () => {
      const meter = new Tone.Meter();
      setMeter(meter);
      Sampler.connect(meter);
    };
    samplerLoaded && !Meter && connectSampler();
  }, [Sampler, Meter, samplerLoaded]);

  useEffect(() => {
    if (!playing && trigger) {
      Sampler.triggerAttack(note);
      setPlaying(true);
    }
    if (playing && !trigger) {
      Sampler.triggerRelease(note);
      setPlaying(false);
    }
  }, [trigger, playing, Sampler, note]);

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
      <div className={`audition ${playing ? "playing" : ""}`} onClick={playSound} />
      <LevelMeter level={amplitude} />
    </div>
  );
}

export default Sampler;
