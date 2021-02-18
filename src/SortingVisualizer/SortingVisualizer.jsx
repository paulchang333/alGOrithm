import React, { useState, useEffect } from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSort";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  // Change this value for the speed of the animations.
  const ANIMATION_SPEED_MS = 5;

  // Change this value for the number of bars (value) in the array.
  const NUMBER_OF_ARRAY_BARS = 200;

  // This is the main color of the array bars.
  const PRIMARY_COLOR = "turquoise";

  // This is the color of array bars that are being compared throughout the animations.
  const SECONDARY_COLOR = "red";

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }

  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    setArray(array);
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
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

  const selectionSort = (arr) => {
    const animations = getSelectionSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
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

  const testSortingAlgorithms = () => {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const sortedArray = selectionSort(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
    }
  };

  return (
    <div className="array-container">
      <div class="slidecontainer">
        <input
          type="range"
          min="1"
          max="100"
          value="50"
          class="slider"
          id="myRange"
        />
      </div>
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,
          }}
        ></div>
      ))}

      <button onClick={() => resetArray()}>Generate New Array</button>
      <button onClick={() => mergeSort()}>Merge Sort</button>
      <button onClick={() => quickSort()}>Quick Sort</button>
      <button onClick={() => selectionSort()}>selection Sort</button>
      <button onClick={() => bubbleSort()}>Bubble Sort</button>
      <button onClick={() => testSortingAlgorithms()}>
        Test Sorting Algorithms (BROKEN)
      </button>
    </div>
  );
};

export default SortingVisualizer;
