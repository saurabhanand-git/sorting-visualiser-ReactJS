export const bubbleSort = (unsortedArr) => {
  const n = unsortedArr.length;
  const inputArr = [...unsortedArr];

  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n; i++) {
      if (inputArr[i] > inputArr[i + 1]) {
        [inputArr[i], inputArr[i + 1]] = [inputArr[i + 1], inputArr[i]];
        sorted = false;
      }
    }
  }

  return inputArr;
};
