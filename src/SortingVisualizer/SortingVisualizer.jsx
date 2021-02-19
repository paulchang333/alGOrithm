import React, { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSort";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const ANIMATION_SPEED_MS = 5;

  // This is the main color of the array bars.
  const PRIMARY_COLOR = "turquoise";

  // This is the color of array bars that are being compared throughout the animations.
  const SECONDARY_COLOR = "red";

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // function arraysAreEqual(arrayOne, arrayTwo) {
  //   if (arrayOne.length !== arrayTwo.length) return false;
  //   for (let i = 0; i < arrayOne.length; i++) {
  //     if (arrayOne[i] !== arrayTwo[i]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // const testSortingAlgorithms = () => {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     const sortedArray = selectionSort(array.slice());
  //     console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
  //   }
  // };

  const [array, setArray] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const array = [];
    let slider = document.getElementById("myRange");
    let NUMBER_OF_ARRAY_BARS = slider.value;
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 300));
    }
    setArray(array);
  };

  const setarr = (str, num) => {
    let arr = algorithms;
    arr[num] = str;
    setAlgorithms(arr);
  };

  const algorithmsRace = () => {
    if (algorithms.includes("merge")) {
      algorithms.indexOf("merge") === 0 ? mergeSort(1) : mergeSort(2);
    }
    if (algorithms.includes("selection")) {
      algorithms.indexOf("selection") === 0
        ? selectionSort(1)
        : selectionSort(2);
    }
    if (algorithms.includes("bubble")) {
      algorithms.indexOf("bubble") === 0 ? bubbleSort(1) : bubbleSort(2);
    }
  };

  const mergeSort = (arr_num) => {
    let arr = array.slice();
    const animations = getMergeSortAnimations(arr);
    const animationLength = animations.length;
    const percentLength = animationLength / 100;
    const elem = document.getElementById(`myBar${arr_num}`);
    let wid = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(`array${arr_num}`);
      const isColorChange = i % 3 !== 2;

      if (i % percentLength <= 1) {
        setTimeout(() => {
          wid++;
          elem.style.width = wid + "%";
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

  const quickSort = () => {
    // We leave it as an exercise to the viewer of this code to implement this method.
  };

  const selectionSort = (arr_num) => {
    let arr = array.slice();
    const animations = getSelectionSortAnimations(arr);
    const animationLength = animations.length;
    const percentLength = animationLength / 100;
    const elem = document.getElementById(`myBar${arr_num}`);
    let wid = 0;
    console.log(animations);
    for (let i = 0; i < animationLength; i++) {
      const arrayBars = document.getElementsByClassName(`array${arr_num}`);

      if (i % percentLength <= 1) {
        setTimeout(() => {
          wid++;
          elem.style.width = wid + "%";
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

  const bubbleSort = (arr) => {
    let swapped;
    let n = arr.length;
    let sortedArray = arr;
    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (sortedArray[i] > sortedArray[i + 1]) {
          let temp = sortedArray[i];
          sortedArray[i] = sortedArray[i + 1];
          sortedArray[i + 1] = temp;
          swapped = true;
        }
      }
      n--;
    } while (swapped);

    return sortedArray;
  };

  return (
    <div className="grid-container">
      <div className="slidecontainer">
        <input
          class="numberSlider"
          type="range"
          min="1"
          max="100"
          className="slider"
          id="myRange"
        />
      </div>
      <div className="array">
        {array.map((value, idx) => (
          <div
            className="array-bar array1"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div id="myProgress">
        <div className="myBar" id="myBar1"></div>
      </div>
      <div className="array">
        {array.map((value, idx) => (
          <div
            className="array-bar array2"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div id="myProgress">
        <div className="myBar" id="myBar2"></div>
      </div>
      <div>
        <button onClick={() => resetArray()}>Generate New Array</button>
      </div>

      <div className="buttons">
        <h1>ALGORITHM 1</h1>
        <button onClick={() => setarr("merge", 0)}>Merge Sort</button>
        <button onClick={() => setarr("selection", 0)}>selection Sort</button>
        {/* <button onClick={() => (setAlgorithms[0] = "bubble")}>
          Bubble Sort
        </button> */}

        {/* <button onClick={() => testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button> */}
      </div>
      <div className="buttons">
        <h1>ALGORITHM 2</h1>
        <button onClick={() => setarr("merge", 1)}>Merge Sort</button>
        <button onClick={() => setarr("selection", 1)}>selection Sort</button>
        {/* <button onClick={() => (setAlgorithms[1] = "bubble")}>
          Bubble Sort
        </button> */}

        {/* <button onClick={() => testSortingAlgorithms()}>
          Test Sorting Algorithms (BROKEN)
        </button> */}
      </div>
      <div className="buttons">
        <button onClick={() => algorithmsRace()}>RACE!!!!!!</button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
