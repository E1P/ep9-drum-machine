import React from "react";
import Tone from "tone";

function Visualiser() {
  const waveform = new Tone.Waveform();
  const master = Tone.Master();
  waveform.connect(master);

  return <div className="waveform" onClick={() => console.log(waveform)} />;
}

export default Visualiser;
