import React, { useState } from "react";
import "./App.css";
import Sampler from "./Components/Sampler";
import MasterOut from "./Components/MasterOut";
import { sounds } from "./data";

function App() {
  const [triggers, setTriggers] = useState({
    a: false,
    s: false,
    d: false,
    f: false,
    g: false,
    h: false,
    j: false,
    k: false,
    l: false
  });

  const handleKeyDown = event => {
    const newTriggers = { ...triggers };
    newTriggers[event.key] = true;
    setTriggers(newTriggers);
  };

  const handleKeyUp = event => {
    const newTriggers = { ...triggers };
    newTriggers[event.key] = false;
    setTriggers(newTriggers);
  };

  return (
    <div className="App" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
      {sounds.map((sound, index) => {
        return <Sampler key={index} file={sound.file} note={sound.note} trigger={triggers[sound.key]} />;
      })}
      <MasterOut />
    </div>
  );
}

export default App;
