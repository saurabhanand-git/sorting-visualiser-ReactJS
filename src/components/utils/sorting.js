export const bubbleSort = (unsortedArr) => {
  const n = unsortedArr.length;
  const input = [...unsortedArr];
  let j = 0;
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - j + 1; i++) {
      if (input[i] > input[i + 1]) {
        [input[i], input[i + 1]] = [input[i + 1], input[i]];
        sorted = false;
      }
    }
    j++;
  }

  return input;
};
