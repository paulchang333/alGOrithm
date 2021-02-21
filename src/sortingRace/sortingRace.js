import React, { useState, useEffect } from "react";

import "./sortingRace.css";
import SortingInstance from "../SortingVisualizer/SortingInstance";

const SortingRace = () => {
  const NUMBER_OF_ARRAY_BARS = 200;
  const [array, setArray] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);
  const [startRace, setStartRace] = useState(false);
  const [raceWinner, setRaceWinner] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    console.log(raceWinner);
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

  const resetArray = () => {
    const array = [];
    let slider = document.getElementById("myRange");
    let NUMBER_OF_ARRAY_BARS = slider.value;
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 250));
    }
    setArray(array);
  };

  const setarr = (str, num) => {
    let arr = algorithms;
    arr[num] = str;
    setAlgorithms(arr);
  };

  const buttonFunction = (algo, num) => {
    let str = document.getElementById(`Algo${num}`).innerHTML;
    let newAlgo = str.replace(str, `${algo}`);
    document.getElementById(`Algo${num}`).innerHTML = newAlgo;
    setarr(algo, num);
  };

  const buttonFunction2 = () => {
    setStartRace(true);
    setRaceWinner([]);
  };

  return (
    <div className="grid-container">
      <div className="slidecontainer">
        <input
          class="numberSlider"
          type="range"
          min="1"
          max="500"
          className="slider"
          id="myRange"
        />
      </div>
      <div>
        <button onClick={() => resetArray()}>Generate New Array</button>
      </div>
      <div className="buttons">
        <h1 id="Algo0">ALGORITHM 1</h1>
        <button onClick={() => buttonFunction("MERGE", 0)}>Merge Sort</button>
        <button onClick={() => buttonFunction("SELECTION", 0)}>
          Selection Sort
        </button>
        <button onClick={() => buttonFunction("BUBBLE", 0)}>Bubble Sort</button>
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
      />

      <div className="buttons">
        <h1 id="Algo1">ALGORITHM 2</h1>
        <button onClick={() => buttonFunction("MERGE", 1)}>Merge Sort</button>
        <button onClick={() => buttonFunction("SELECTION", 1)}>
          Selection Sort
        </button>
        <button onClick={() => buttonFunction("BUBBLE", 1)}>Bubble Sort</button>
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
      />

      <div className="buttons">
        <button onClick={() => buttonFunction2()}>RACE!!!!!!</button>
      </div>
    </div>
  );
};

export default SortingRace;
