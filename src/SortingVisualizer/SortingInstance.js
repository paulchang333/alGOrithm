import React, { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort.js";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSort";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";

import "./SortingInstance.css";

const SortingVisualizer = (props) => {
  const ANIMATION_SPEED_MS = 1;

  // This is the main color of the array bars.
  const PRIMARY_COLOR = "turquoise";

  // This is the color of array bars that are being compared throughout the animations.
  const SECONDARY_COLOR = "red";

  const { algorithm, array, startRace, id } = props;
  const [first, setFirst] = useState(false);

  useEffect(() => {
    if (startRace) {
      if (algorithm === "MERGE") {
        mergeSort();
      } else if (algorithm === "BUBBLE") {
        bubbleSort();
      } else if (algorithm === "SELECTION") {
        selectionSort();
      }
    }
  }, [startRace]);

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
        setTimeout(() => {
          wid++;
          elem.style.width = wid + "%";
          if (wid === 100 && first === false) {
            setFirst(true);
            const winner = document.getElementsByClassName(`winner-${id}`);
            winner[0].style.display = "block";
          }
        }, i * ANIMATION_SPEED_MS);
      }

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
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
        setTimeout(() => {
          wid++;
          elem.style.width = wid + "%";
          if (wid === 100 && first === false) {
            setFirst(true);
            const winner = document.getElementsByClassName(`winner-${id}`);
            winner[0].style.display = "block";
          }
        }, i * ANIMATION_SPEED_MS);
      }

      if (animations[i][0] === "o") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }

      if (animations[i][0] === "f") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barTwoIdx = animations[i][2];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }

      if (animations[i][0] === "i") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }

      if (animations[i][0] === "ii") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
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
        }, i * ANIMATION_SPEED_MS);
      }
      if (animations[i][0] === "r") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
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
        setTimeout(() => {
          wid++;
          elem.style.width = wid + "%";
          if (wid === 100 && first === false) {
            setFirst(true);
            const winner = document.getElementsByClassName(`winner-${id}`);
            winner[0].style.display = "block";
          }
        }, i * ANIMATION_SPEED_MS);
      }

      if (animations[i][0] === "o") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoIdx = animations[i][2];
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
      if (animations[i][0] === "oo") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }

      if (animations[i][0] === "s") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoIdx = animations[i][2];
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }

      if (animations[i][0] === "ss") {
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
        }, i * ANIMATION_SPEED_MS);
      }

      if (animations[i][0] === "c") {
        setTimeout(() => {
          const barOneIdx = animations[i][1];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  return (
    <div>
      <h1 className={"winner-" + id}>OKSDOFKSFDSFDS</h1>
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
      <div id="myProgress">
        <div id={"myBar" + id}></div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
