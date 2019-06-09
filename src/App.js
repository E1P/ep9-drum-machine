import React from "react";
import "./App.css";
import Sampler from "./Components/Sampler/Sampler";
import MasterOut from "./Components/MasterOut/MasterOut";
import { sounds } from "./data";

function App() {
  return (
    <div className="App">
      <div className="drum-pad">
        {sounds.map((sound, index) => {
          const { file, note, key, release } = sound;
          return <Sampler key={index} file={file} note={note} trigger={key} release={release} />;
        })}
      </div>
      <MasterOut />
    </div>
  );
}

export default App;
