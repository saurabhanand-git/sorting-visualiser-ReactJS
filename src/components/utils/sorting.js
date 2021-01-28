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
      sortObj.animations.push([i, i + 1, "comp", "comp", "comp"]);
      if (input[i] > input[i + 1]) {
        sortObj.animations.push([i, i + 1, "swap", "swap", "swap"]);
        sortObj.animations.push([i, i + 1, "done", "done", "done"]);
        [input[i], input[i + 1]] = [input[i + 1], input[i]];
        sorted = false;
      } else {
        sortObj.animations.push([i, i + 1, "done", "done", "done"]);
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

  for (let i = 1; i < n; i++) {
    let key = input[i];
    let j = i - 1;
    sortObj.animations.push([i, j, "comp", "key", "comp"]);
    while (j >= 0 && key < input[j]) {
      sortObj.animations.push([j + 1, j, "comp", "key", "comp"]);
      sortObj.animations.push([j + 1, j, "swap", "key", "swap"]);
      input[j + 1] = input[j];
      sortObj.animations.push([j + 1, j, "insert", "done", "key"]);

      j -= 1;
    }
    input[j + 1] = key;
    // add extra index to reset j
    sortObj.animations.push([i, j + 1, "done", "done", "done", j, "done"]);
  }

  sortObj.sortedArray = input;
  return sortObj;
};

export const mergeSortWrap = (unsortedArr) => {
  const sortObj = {
    animations: [],
  };
  const mergeSort = (unsortedArr) => {
    if (unsortedArr.length < 2) {
      return unsortedArr;
    }

    const midIndex = Math.floor(unsortedArr.length / 2);

    const left = unsortedArr.slice(0, midIndex);
    const right = unsortedArr.slice(midIndex);

    return merge(mergeSort(left), mergeSort(right));
  };

  const merge = (left, right) => {
    const resultArr = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        resultArr.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArr.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return resultArr
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  };
  const sorted = mergeSort(unsortedArr);
  sortObj.sortedArray = sorted;
  return sortObj;
};
