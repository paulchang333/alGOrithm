export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  doBubble(array, animations);
  return animations;
}

const doBubble = (arr, animations) => {
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
        animations.push(["s", i, i + 1]);
        animations.push(["ss", i, i + 1, temp]);
        animations.push(["sss", i, i + 1, sortedArray[i], sortedArray[i + 1]]);
      } else {
        animations.push(["o", i, i + 1]);
        animations.push(["oo", i]);
      }
    }
    n--;
    animations.push(["c", n]);
  } while (swapped);

  return sortedArray;
};
