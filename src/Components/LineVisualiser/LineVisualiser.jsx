import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import * as Tone from "tone";
import "./LineVisualiser.css";
import { calculateAverages } from "../../util-functions";

function LineVisualiser({ enabled, handleVisualiserClick }) {
  const [waveform, setWaveform] = useState(null);
  const [values, setValues] = useState([]);
  const [freqLine, setFreqLine] = useState("350 650");
  const [valuesArr, setValuesArr] = useState([[], [], []]);
  const savedValues = useRef();

  useEffect(() => {
    if (!waveform) {
      const newWaveform = new Tone.FFT(32);
      const receiveChannel = new Tone.Channel();
      receiveChannel.receive("waveform");
      receiveChannel.connect(newWaveform);

      setWaveform(newWaveform);
    }
  }, [waveform]);

  useLayoutEffect(() => {
    let animationId;
    const getValues = () => {
      const newValues = Array.from(waveform.getValue());
      setValues(newValues);
      savedValues.current = !savedValues.current
        ? [newValues]
        : [newValues, ...savedValues.current.slice(0, 4)];
      setValuesArr(savedValues.current);
    };

    if (waveform && enabled) animationId = requestAnimationFrame(getValues);
    if (animationId)
      return () => {
        cancelAnimationFrame(animationId);
      };
  }, [waveform, enabled, values]);

  useLayoutEffect(() => {
    const createLineString = (arr) => {
      return arr
        .map((freq, index) => {
          const y = freq > -99 ? 350 - (Math.floor(freq) + 100) * 3.5 : 344;
          const x = index * 20.51 + 5;
          return `${x},${y}`;
        })
        .join(" ");
    };
    let lineString;
    lineString = createLineString(calculateAverages(valuesArr));
    setFreqLine(`5,345 ${lineString} 641,345 5,345`);
  }, [valuesArr]);

  return (
    <div className='waveform' onClick={handleVisualiserClick}>
      {!enabled && <p className='visualiser-text'>Click to enable audio visualiser</p>}
      {enabled && (
        <div className='svg-container'>
          <svg width='646' height='345'>
            <defs>
              <linearGradient id='fill-gradient' x1='0' x2='0' y1='1' y2='0'>
                <stop offset='0' stopColor='transparent' />
                <stop offset='1' stopColor='rgba(179, 0, 0)' />
              </linearGradient>
            </defs>
            <polyline
              className='polyline-one'
              points={freqLine}
              shapeRendering='auto'
              fill='url(#fill-gradient)'
              fillOpacity='0.5'
              stroke='rgba(179, 0, 0)'
              strokeWidth='1'
              strokeOpacity='0.7'
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default LineVisualiser;
