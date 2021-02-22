export const getInsertionSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  doInsertion(array, animations);
  return animations;
};

const doInsertion = (array, animations) => {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    animations.push(["d", i]);
    let j = i - 1;
    animations.push(["d", j]);
    while (j >= 0 && current < array[j]) {
      animations.push(["d", j]);
      animations.push(["dd", j]);
      animations.push(["s", j + 1, array[j]]);
      array[j + 1] = array[j];
      j--;
    }
    animations.push(["s", j + 1, current]);
    array[j + 1] = current;

    animations.push(["dd", i]);
  }
};
