export const bubbleSort = (unsortedArr) => {
  const n = unsortedArr.length;
  const inputArr = [...unsortedArr];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (inputArr[j] > inputArr[j + 1]) {
        [inputArr[j], inputArr[j + 1]] = [inputArr[j + 1], inputArr[j]];
      }
    }
  }
  return inputArr;
};
