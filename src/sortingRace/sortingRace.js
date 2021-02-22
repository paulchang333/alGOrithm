import React, { useState, useEffect } from "react";

import "./sortingRace.css";
import SortingInstance from "../SortingVisualizer/SortingInstance";

const DEFAULT_ARRAY_BARS = 25;

const SortingRace = () => {
  const [array, setArray] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);
  const [startRace, setStartRace] = useState(false);
  const [raceWinner, setRaceWinner] = useState([]);
  const [raceOnGoing, setRaceOnGoing] = useState(false);
  const [selected, setSelected] = useState(true);
  const [raceDone, setRaceDone] = useState([]);
  const [numberOfArrayBars, setNumberOfArrayBars] = useState(
    DEFAULT_ARRAY_BARS
  );
  const [speed, setSpeed] = useState(5);

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    if (raceWinner.length > 0) {
      const winner = document.getElementsByClassName(`winner-${raceWinner}`);
      if (winner !== null) {
        winner[0].style.display = "block";
      }
    }
  }, [raceWinner]);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const handleRangeChange = (e) => {
    resetArray(e.target.value);
    setNumberOfArrayBars(e.target.value);
  };

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  const resetArray = () => {
    const array = [];
    for (let i = 0; i < numberOfArrayBars; i++) {
      array.push(randomIntFromInterval(5, 200));
    }
    setArray(array);
  };

  const setarr = (str, num) => {
    let arr = algorithms;
    arr[num] = str;
    setAlgorithms(arr);
    if (algorithms.length === 2) {
      setSelected(false);
    }
  };

  const buttonFunction = (algo, num) => {
    let str = document.getElementById(`Algo${num}`).innerHTML;
    let newAlgo = str.replace(str, `${algo}`);
    document.getElementById(`Algo${num}`).innerHTML = newAlgo;
    setarr(algo, num);
  };

  const buttonFunction2 = () => {
    if (algorithms.length > 0) {
      setStartRace(true);
      setRaceWinner([]);
      setRaceOnGoing(true);
      setRaceDone([]);
    }
  };

  return (
    <div className="grid-container">
      <div className="grid-item1">
        <div className="welcome">
          <h1>Welcome to alGOrithm</h1>
          <p>Race different sorting algorithms to see which one is faster!</p>
          <p>Please select two algorithms to start the race</p>
        </div>
        <div className="slidecontainer">
          <label htmlFor="size-slider">
            <b>Array Size:</b> {numberOfArrayBars}
          </label>
          <input
            class="numberSlider"
            type="range"
            min="1"
            max="50"
            className="slider"
            id="myRange"
            value={numberOfArrayBars}
            onChange={(e) => handleRangeChange(e)}
            disabled={raceOnGoing}
          />
        </div>
        <div className="slidecontainer">
          <label htmlFor="size-slider">
            <b>Sorting Speed:</b> {speed}ms
          </label>
          <input
            class="numberSlider"
            type="range"
            min="1"
            max="100"
            className="slider"
            id="myRange"
            value={speed}
            onChange={(e) => handleSpeedChange(e)}
            disabled={raceOnGoing}
          />
        </div>

        <div className="buttons">
          <div>
            <button
              disabled={raceOnGoing}
              onClick={() => resetArray(numberOfArrayBars)}
            >
              Generate New Array
            </button>
          </div>
          <button
            disabled={raceOnGoing || selected}
            onClick={() => buttonFunction2()}
          >
            RACE!!!!!!
          </button>
          <button onClick={() => window.location.reload(false)}>
            <b>RESET</b>
          </button>
        </div>
      </div>

      <div>
        <h1 id="Algo0">ALGORITHM 1</h1>
        <div className="buttons" disabled={raceOnGoing}>
          <button
            disabled={raceOnGoing}
            onClick={() => buttonFunction("MERGE", 0)}
          >
            Merge Sort
          </button>
          <button
            disabled={raceOnGoing}
            onClick={() => buttonFunction("SELECTION", 0)}
          >
            Selection Sort
          </button>
          <button
            disabled={raceOnGoing}
            onClick={() => buttonFunction("BUBBLE", 0)}
          >
            Bubble Sort
          </button>
          <button
            disabled={raceOnGoing}
            onClick={() => buttonFunction("INSERTION", 0)}
          >
            Insertion Sort
          </button>
        </div>
        <h1 className={"winner-1"}>WINNER</h1>
        <SortingInstance
          algorithm={algorithms[0]}
          array={array}
          startRace={startRace}
          setStartRace={setStartRace}
          raceWinner={raceWinner}
          setRaceWinner={setRaceWinner}
          id={1}
          setRaceOnGoing={setRaceOnGoing}
          raceDone={raceDone}
          setRaceDone={setRaceDone}
          speed={speed}
        />

        <h1 id="Algo1">ALGORITHM 2</h1>
        <div className="buttons" disabled={raceOnGoing}>
          <button
            disabled={raceOnGoing}
            onClick={() => buttonFunction("MERGE", 1)}
          >
            Merge Sort
          </button>
          <button
            disabled={raceOnGoing}
            onClick={() => buttonFunction("SELECTION", 1)}
          >
            Selection Sort
          </button>
          <button
            disabled={raceOnGoing}
            onClick={() => buttonFunction("BUBBLE", 1)}
          >
            Bubble Sort
          </button>
          <button
            disabled={raceOnGoing}
            onClick={() => buttonFunction("INSERTION", 1)}
          >
            Insertion Sort
          </button>
        </div>
        <h1 className={"winner-2"}>WINNER</h1>
        <SortingInstance
          algorithm={algorithms[1]}
          array={array}
          startRace={startRace}
          setStartRace={setStartRace}
          raceWinner={raceWinner}
          setRaceWinner={setRaceWinner}
          id={2}
          setRaceOnGoing={setRaceOnGoing}
          raceDone={raceDone}
          setRaceDone={setRaceDone}
          speed={speed}
        />
      </div>
    </div>
  );
};

export default SortingRace;
