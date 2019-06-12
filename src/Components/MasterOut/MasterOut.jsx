import { /* React, */ useState, useEffect } from "react";
import Tone from "tone";
Tone.context.lookAhead = 0;

function MasterOut() {
  const [reverbLoaded, setReverbLoaded] = useState(false);
  const [compressor, setCompressor] = useState(null);
  const [disto, setDisto] = useState(null);
  const [chorus, setChorus] = useState(null);
  const [pingPongDelay, setPingPongDelay] = useState(null);
  const [reverb, setReverb] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);

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
          feedback: 0.9,
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
      setAllLoaded(true);
    }
  }, [reverbLoaded, allLoaded, compressor, disto, reverb, chorus, pingPongDelay]);

  return null;
}

export default MasterOut;
