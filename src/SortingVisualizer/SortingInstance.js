import React, { useEffect } from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort.js";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSort";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSort";

import "./SortingInstance.css";

const SortingVisualizer = (props) => {
  const PRIMARY_COLOR = "turquoise";
  const SECONDARY_COLOR = "red";

  const {
    algorithm,
    array,
    startRace,
    setStartRace,
    raceWinner,
    setRaceWinner,
    id,
    setRaceOnGoing,
    raceDone,
    setRaceDone,
    speed,
  } = props;

  useEffect(() => {
    if (raceWinner.length > 0) {
      const winner = document.getElementsByClassName(`winner-${raceWinner}`);
      if (winner !== null) {
        winner[0].style.display = "block";
      }
    }
  }, [raceWinner]);

  useEffect(() => {
    if (startRace) {
      const winner = document.getElementsByClassName(`winner-${id}`);
      winner[0].style.display = "none";
      if (algorithm === "MERGE") {
        mergeSort();
      } else if (algorithm === "BUBBLE") {
        bubbleSort();
      } else if (algorithm === "SELECTION") {
        selectionSort();
      } else if (algorithm === "INSERTION") {
        insertionSort();
      }
    }
  }, [startRace]);

  const setWinner = () => {
    let arr = raceWinner;
    arr.push(id);
    setRaceWinner(arr);
  };

  const Done = (algorithm) => {
    let arr = raceDone;
    arr.push(algorithm);
    setRaceDone(arr);
    if (raceDone.length === 2) {
      setRaceOnGoing(false);
    }
  };

  const progressbar = (wid, elem, i, str) => {
    setTimeout(() => {
      elem.style.width = wid + "%";
      if (wid === 100 && raceWinner.length === 0) {
        setStartRace(false);
        setWinner();
        const winner = document.getElementsByClassName(`winner-${id}`);
        winner[0].style.display = "block";
        Done(str);
      } else if (wid === 100) {
        Done(str);
      }
    }, i * speed);
  };

  const mergeSort = () => {
    let arr = array.slice();
    const animations = getMergeSortAnimations(arr);
    const animationLength = animations.length;
    const percentLength = animationLength / 100;
    const elem = document.getElementById(`myBar${id}`);
    let wid = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(`array-bar-${id}`);
      const isColorChange = i % 3 !== 2;

      if (i % percentLength <= 1) {
        wid++;
        progressbar(wid, elem, i, "merge");
      }

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * speed);
      }
    }
  };

  const selectionSort = () => {
    let arr = array.slice();
    const animations = getSelectionSortAnimations(arr);
    const animationLength = animations.length;
    const percentLength = animationLength / 100;
    const elem = document.getElementById(`myBar${id}`);
    let wid = 0;
    for (let i = 0; i < animationLength; i++) {
      const arrayBars = document.getElementsByClassName(`array-bar-${id}`);
      if (i % percentLength <= 1) {
        wid++;
        progressbar(wid, elem, i, "selection");
      }
      if (animations[i][0] === "o") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
      }

      if (animations[i][0] === "f") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barTwoIdx = animations[i][2];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
      }

      if (animations[i][0] === "i") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
      }

      if (animations[i][0] === "ii") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * speed);
      }

      if (animations[i][0] === "s") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneVal = animations[i][3];
          const barTwoIdx = animations[i][2];
          const barTwoVal = animations[i][4];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${barOneVal}px`;
          barTwoStyle.height = `${barTwoVal}px`;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * speed);
      }
      if (animations[i][0] === "r") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * speed);
      }
    }
  };
  const insertionSort = () => {
    let arr = array.slice();
    const animations = getInsertionSortAnimations(arr);
    const animationLength = animations.length;
    const percentLength = animationLength / 100;
    const elem = document.getElementById(`myBar${id}`);
    let wid = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(`array-bar-${id}`);
      if (i % percentLength <= 1) {
        wid++;
        progressbar(wid, elem, i, "bubble");
      }

      if (animations[i][0] === "d") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
      }
      if (animations[i][0] === "dd") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * speed);
      }
      if (animations[i][0] === "s") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneVal = animations[i][2];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barOneVal}px`;
        }, i * speed);
      }
    }
  };

  const bubbleSort = () => {
    let arr = array.slice();
    const animations = getBubbleSortAnimations(arr);
    const animationLength = animations.length;
    const percentLength = animationLength / 100;
    const elem = document.getElementById(`myBar${id}`);
    let wid = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(`array-bar-${id}`);
      if (i % percentLength <= 1) {
        wid++;
        progressbar(wid, elem, i, "bubble");
      }

      if (animations[i][0] === "o") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoIdx = animations[i][2];
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
      }
      if (animations[i][0] === "oo") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * speed);
      }

      if (animations[i][0] === "s") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoIdx = animations[i][2];
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
      }

      if (animations[i][0] === "ss") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const bartemp = animations[i][3];
          const barTwoIdx = animations[i][2];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${bartemp}px`;
          barTwoStyle.height = `${bartemp}px`;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * speed);
      }

      if (animations[i][0] === "sss") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneVal = animations[i][3];
          const barTwoIdx = animations[i][2];
          const barTwoVal = animations[i][4];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${barOneVal}px`;
          barTwoStyle.height = `${barTwoVal}px`;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * speed);
      }

      if (animations[i][0] === "c") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * speed);
      }
    }
  };

  return (
    <div>
      <h1 className={"winner-" + id}>WINNER</h1>
      <div className="array">
        {array.map((value, idx) => (
          <div
            className={"array-bar-" + id}
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div id="progressContainer">
        <div id="myProgress">
          <div id={"myBar" + id}></div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
