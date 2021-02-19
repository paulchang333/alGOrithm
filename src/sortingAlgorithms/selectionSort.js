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
    } else {
      animations.push(["r", i]);
    }
  }
};
