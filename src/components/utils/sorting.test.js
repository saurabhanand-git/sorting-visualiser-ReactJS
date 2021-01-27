import { bubbleSort, insertionSort } from "./sorting";
import { generateNewArray } from "./arrays";

describe("sorting functions", () => {
  describe("bubbleSort", () => {
    it("should return a sorted array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
      const sorted = [...valuesToSort].sort((a, b) => a - b);
      expect(bubbleSort(valuesToSort).sortedArray).toEqual(sorted);
    });
    it("should not mutate the input array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
      const unsortedArrCopy = [...valuesToSort];
      bubbleSort(valuesToSort);
      expect(valuesToSort).toEqual(unsortedArrCopy);
    });
    it("should return a list of comparison animations for an already sorted array", () => {
      const unsortedArr = [1, 2, 3, 4];
      const expAnim = [
        [0, 1, "comp"],
        [0, 1, "done"],
        [1, 2, "comp"],
        [1, 2, "done"],
        [2, 3, "comp"],
        [2, 3, "done"],
      ];
      expect(bubbleSort(unsortedArr).animations).toEqual(expAnim);
    });
    it("should return a list of comparison and swap animations when required", () => {
      const unsortedArr = [1, 2, 4, 3];
      const expAnim = [
        [0, 1, "comp"],
        [0, 1, "done"],
        [1, 2, "comp"],
        [1, 2, "done"],
        [2, 3, "comp"],
        [2, 3, "swap"],
        [2, 3, "done"],
        [0, 1, "comp"],
        [0, 1, "done"],
        [1, 2, "comp"],
        [1, 2, "done"],
      ];
      expect(bubbleSort(unsortedArr).animations).toEqual(expAnim);
    });
  });
  describe("insertionSort", () => {
    it("should return a sorted array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
      const sorted = [...valuesToSort].sort((a, b) => a - b);
      expect(insertionSort(valuesToSort).sortedArray).toEqual(sorted);
    });
  });
});
