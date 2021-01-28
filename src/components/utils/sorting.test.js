import { bubbleSort, insertionSort, mergeSortWrap } from "./sorting";
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
        [0, 1, "comp", "comp", "comp"],
        [0, 1, "done", "done", "done"],
        [1, 2, "comp", "comp", "comp"],
        [1, 2, "done", "done", "done"],
        [2, 3, "comp", "comp", "comp"],
        [2, 3, "done", "done", "done"],
      ];
      expect(bubbleSort(unsortedArr).animations).toEqual(expAnim);
    });
    it("should return a list of comparison and swap animations when required", () => {
      const unsortedArr = [1, 2, 4, 3];
      const expAnim = [
        [0, 1, "comp", "comp", "comp"],
        [0, 1, "done", "done", "done"],
        [1, 2, "comp", "comp", "comp"],
        [1, 2, "done", "done", "done"],
        [2, 3, "comp", "comp", "comp"],
        [2, 3, "swap", "swap", "swap"],
        [2, 3, "done", "done", "done"],
        [0, 1, "comp", "comp", "comp"],
        [0, 1, "done", "done", "done"],
        [1, 2, "comp", "comp", "comp"],
        [1, 2, "done", "done", "done"],
      ];
      expect(bubbleSort(unsortedArr).animations).toEqual(expAnim);
    });
  });
  describe.skip("insertionSort", () => {
    it("should return a sorted array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
      const sorted = [...valuesToSort].sort((a, b) => a - b);
      expect(insertionSort(valuesToSort).sortedArray).toEqual(sorted);
    });
    it("should not mutate the input array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
      const unsortedArrCopy = [...valuesToSort];
      insertionSort(valuesToSort);
      expect(valuesToSort).toEqual(unsortedArrCopy);
    });
    it("should return a list of comparison animations for an already sorted array", () => {
      const unsortedArr = [1, 2, 3, 4];
      const expAnim = [
        [1, 0, "comp", "key", "comp"],
        [1, 0, "done", "done", "done"],
        [2, 1, "comp", "key", "comp"],
        [2, 1, "done", "done", "done"],
        [3, 2, "comp", "key", "comp"],
        [3, 2, "done", "done", "done"],
      ];
      expect(insertionSort(unsortedArr).animations).toEqual(expAnim);
    });
    it("should return a list of comparison and swap animations when required", () => {
      const unsortedArr = [2, 3, 1, 4];
      const expAnim = [
        [1, 0, "comp", "key", "comp"],
        [1, 0, "done", "done", "done"],
        [2, 1, "comp", "key", "comp"],
        [2, 1, "done", "done", "done"],
        [3, 2, "comp", "key", "comp"],
        [3, 2, "done", "done", "done"],
      ];
      expect(insertionSort(unsortedArr).animations).toEqual(expAnim);
    });
  });
  describe.only("mergeSort", () => {
    it("should return a sorted array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
      const sorted = [...valuesToSort].sort((a, b) => a - b);
      expect(mergeSortWrap(valuesToSort).sortedArray).toEqual(sorted);
    });
    it("should not mutate the input array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
      const unsortedArrCopy = [...valuesToSort];
      insertionSort(valuesToSort);
      expect(valuesToSort).toEqual(unsortedArrCopy);
    });
  });
});
