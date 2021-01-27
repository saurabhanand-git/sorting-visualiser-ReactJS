export const bubbleSort = (unsortedArr) => {
  const n = unsortedArr.length;
  const input = [...unsortedArr];
  let j = 0;
  let sorted = false;
  const sortObj = {
    animations: [],
  };
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - j - 1; i++) {
      sortObj.animations.push([i, i + 1, "comp"]);
      if (input[i] > input[i + 1]) {
        sortObj.animations.push([i, i + 1, "swap"]);
        sortObj.animations.push([i, i + 1, "done"]);
        [input[i], input[i + 1]] = [input[i + 1], input[i]];
        sorted = false;
      } else {
        sortObj.animations.push([i, i + 1, "done"]);
      }
    }
    j++;
  }

  sortObj.sortedArray = input;
  return sortObj;
};

export const insertionSort = (unsortedArr) => {
  const n = unsortedArr.length;
  const input = [...unsortedArr];
  const sortObj = {
    animations: [],
  };
  // let i = i;
  for (let i = 1; i < n; i++) {
    let key = input[i];

    let j = i - 1;
    while (j >= 0 && key < input[j]) {
      input[j + 1] = input[j];
      j -= 1;
    }
    input[j + 1] = key;
  }

  sortObj.sortedArray = input;
  return sortObj;
};
