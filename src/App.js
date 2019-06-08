import React from "react";
import "./App.css";
import Sampler from "./Components/Sampler";
import MasterOut from "./Components/MasterOut";
import { sounds } from "./data";

function App() {
  return (
    <div className="App">
      {sounds.map((sound, index) => {
        const { file, note, key, release } = sound;
        return <Sampler key={index} file={file} note={note} trigger={key} release={release} />;
      })}
      <MasterOut />
    </div>
  );
}

export default App;
