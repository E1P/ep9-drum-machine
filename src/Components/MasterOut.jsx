import { /* React, */ useState, useEffect } from "react";
import Tone from "tone";
Tone.context.lookAhead = 0;

function MasterOut() {
  const [reverbLoaded, setReverbLoaded] = useState(false);
  const [compressor, setCompressor] = useState(null);
  const [disto, setDisto] = useState(null);
  const [reverb, setReverb] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    console.log("Master effect...", allLoaded);
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
      Tone.Master.chain(disto, reverb, compressor);
      setAllLoaded(true);
    }
  }, [reverbLoaded, compressor, disto, reverb, allLoaded]);

  return null;
}

export default MasterOut;
