const sounds = [
  {
    key: "r",
    file: "kick",
    note: "C3",
    release: false
  },
  {
    key: "t",
    file: "snare",
    note: "D3",
    release: false
  },
  {
    key: "y",
    file: "hat-closed",
    note: "E3",
    release: false
  },
  {
    key: "f",
    file: "hat-open",
    note: "F3",
    release: true
  },
  {
    key: "g",
    file: "tube-hit",
    note: "G3",
    release: false
  },
  {
    key: "h",
    file: "cymbal",
    note: "A4",
    release: false
  },
  {
    key: "v",
    file: "strings",
    note: "B4",
    release: false
  },
  {
    key: "b",
    file: "stab",
    note: "C4",
    release: true
  },
  {
    key: "n",
    file: "bass",
    note: "D4",
    release: true
  }
];

const initialFFTArray = [];
for (let i = 0; i < 32; i++) {
  initialFFTArray[i] = 0;
}

export { sounds, initialFFTArray };
