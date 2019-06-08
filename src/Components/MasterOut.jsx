import Tone from "tone";

const MasterOut = () => {
  const masterCompressor = new Tone.Compressor({
    threshold: -6,
    ratio: 3,
    attack: 0.5,
    release: 0.1
  });
  // const disto = new Tone.Distortion(0.1);
  const freeverb = new Tone.Freeverb(0.9);
  // freeverb.dampening.value = 500;
  Tone.Master.chain(freeverb, masterCompressor);
  return null;
};

export default MasterOut;
