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
      setDisto(new Tone.Distortion(0.9));
      setChorus(
        new Tone.Chorus({
          depth: 1
        })
      );
      setPingPongDelay(
        new Tone.PingPongDelay({
          delayTime: 0.05,
          feedback: 0.9,
          wet: 0.2
        })
      );
      const verb = new Tone.Reverb(0.9);
      verb.preDelay = 0.05;
      verb.generate().then(() => {
        setReverb(verb);
        setReverbLoaded(true);
      });
    }
    if (!allLoaded && reverbLoaded) {
      disto.wet.value = 0;
      reverb.wet.value = 0.5;
      chorus.wet.value = 0;
      Tone.Master.chain(disto, chorus, pingPongDelay, compressor, reverb);
      setAllLoaded(true);
    }
  }, [reverbLoaded, compressor, disto, reverb, allLoaded, chorus, pingPongDelay]);

  return null;
}

export default MasterOut;
