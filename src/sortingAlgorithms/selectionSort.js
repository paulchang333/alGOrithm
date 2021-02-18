export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  doSelection(array, animations);
  return animations;
}

const doSelection = (arr, animations) => {
  let sortedArray = arr;
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let lowestVal = i;
    animations.push(["o", i]);

    for (let k = i + 1; k < n; k++) {
      animations.push(["i", k]);
      animations.push(["ii", k]);
      if (arr[k] < arr[lowestVal]) {
        animations.push(["f", lowestVal, k]);
        lowestVal = k;
      }
    }
    if (lowestVal != i) {
      let temp = sortedArray[i];
      sortedArray[i] = sortedArray[lowestVal];
      sortedArray[lowestVal] = temp;
      animations.push([
        "s",
        i,
        lowestVal,
        sortedArray[i],
        sortedArray[lowestVal],
      ]);
    }
  }
};

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
