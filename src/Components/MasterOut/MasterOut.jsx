import React, { useState, useEffect } from "react";
import Tone from "tone";
import "./master-out.css";
import Dial from "../Dial/Dial";
Tone.context.lookAhead = 0;

function MasterOut() {
  const [reverbLoaded, setReverbLoaded] = useState(false);
  const [compressor, setCompressor] = useState(null);
  const [disto, setDisto] = useState(null);
  const [chorus, setChorus] = useState(null);
  const [pingPongDelay, setPingPongDelay] = useState(null);
  const [reverb, setReverb] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [{ masterAmpMin, masterAmpMax }] = useState({ masterAmpMin: -48, masterAmpMax: 0 });
  const [masterAmpCurrent, setMasterAmpCurrent] = useState(-6);

  useEffect(() => {
    if (!reverbLoaded) {
      setCompressor(
        new Tone.Compressor({
          threshold: -6,
          ratio: 3,
          attack: 0.5,
          release: 0.1
        })
      );
      setDisto(
        new Tone.Distortion({
          distortion: 0.9,
          wet: 0
        })
      );
      setChorus(
        new Tone.Chorus({
          depth: 1,
          wet: 0
        })
      );
      setPingPongDelay(
        new Tone.PingPongDelay({
          delayTime: 0.05,
          feedback: 0.6,
          wet: 0
        })
      );
      const verb = new Tone.Reverb({
        preDelay: 0.05,
        decay: 0.9,
        wet: 0.5
      });
      verb.generate().then(() => {
        setReverb(verb);
        setReverbLoaded(true);
      });
    }
    if (!allLoaded && reverbLoaded) {
      Tone.Master.chain(disto, chorus, pingPongDelay, compressor, reverb);
      Tone.Master.volume.value = -6;
      setAllLoaded(true);
    }
  }, [reverbLoaded, allLoaded, compressor, disto, reverb, chorus, pingPongDelay]);

  useEffect(() => {
    Tone.Master.volume.value = masterAmpCurrent;
  }, [masterAmpCurrent]);

  const handleEnableAudio = () => {
    setAudioEnabled(!audioEnabled);
    Tone.Master.mute = audioEnabled;
  };

  const handleMasterWheel = ({ deltaY }) => {
    const calculateChange = change => {
      const newAmp = masterAmpCurrent + change;
      if (newAmp < -48) return -48;
      if (newAmp > 0) return 0;
      return newAmp;
    };
    setMasterAmpCurrent(calculateChange(deltaY));
  };

  return (
    <div className="master-box">
      <Dial name="Volume" handleWheel={handleMasterWheel} min={masterAmpMin} max={masterAmpMax} current={masterAmpCurrent} />
      <div className="mute-toggle" onClick={handleEnableAudio}>
        {audioEnabled ? "Mute" : "Unmute"}
      </div>
    </div>
  );
}

export default MasterOut;
