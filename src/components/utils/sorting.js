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

// Quicksort functions
export const quickSortWrapper = (unsortedArr) => {
  const input = [...unsortedArr];
  const animations = [];
  const sortObj = {};
  quickSort(input, 0, unsortedArr.length - 1, animations);
  sortObj.sortedArray = input;
  sortObj.animations = animations;
  return sortObj;
};
const quickSort = (arr, start, end, animations) => {
  if (start >= end) return;
  let pivot = partition(arr, start, end, animations);
  quickSort(arr, start, pivot - 1, animations);
  quickSort(arr, pivot + 1, end, animations);
};

const partition = (arr, start, end, animations) => {
  animations.push([end, null, "changePivot"]);
  let pivot = arr[end];
  let i = start - 1;
  for (let j = start; j < end; j++) {
    animations.push([j, null, "comp", "comp"]);
    if (arr[j] < pivot) {
      i++;
      animations.push([j, i, "comp", "swap", "swap"]);
      animations.push([i, j, "swap", "swap", "swap"]);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      animations.push([i, j, "comp", "done", "done"]);
    } else {
      animations.push([j, i, "comp", "done", "done"]);
    }
  }
  animations.push([i + 1, end, "swap", "swap", "swap"]);
  [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
  return i + 1;
};

// Merge Sort Functions
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

// Heap Sort Functions
export const heapSortWrapper = (unsortedArr) => {
  const sortObj = {
    animations: [],
  };
};

export const buildMaxHeap = (inputArr) => {
  const arr = [...inputArr];
  const n = arr.length;
  for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
    heapify(arr, n, i);
  }
  return arr;
};

const heapify = (arr, n, i) => {
  // find the largest element from the root and its children
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  // if root is not largest, swap and continue to heapify
  if (largest != i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
};
