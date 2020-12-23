import { bubbleSort } from "./sorting";
import { generateNewArray } from "./arrays";

describe("sorting functions", () => {
  describe("BubbleSort", () => {
    it("should return a sorted array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const sorted = [...unsortedArr].sort((a, b) => a - b);
      expect(bubbleSort(unsortedArr)).toEqual(sorted);
    });
    it("should not mutate the input array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const unsortedArrCopy = [...unsortedArr];
      bubbleSort(unsortedArr);
      expect(unsortedArr).toEqual(unsortedArrCopy);
    });
  });
});
