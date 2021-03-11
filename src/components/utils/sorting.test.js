import {
  bubbleSort,
  insertionSort,
  mergeSortWrap,
  quickSortWrapper,
  heapSortWrapper,
  buildMaxHeap,
} from "./sorting";
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
  });
  describe("mergeSort", () => {
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
  describe("quickSortWrapper", () => {
    it("should return a sorted array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
      const sorted = [...valuesToSort].sort((a, b) => a - b);
      expect(quickSortWrapper(valuesToSort).sortedArray).toEqual(sorted);
    });
    it("should not mutate the input array", () => {
      const unsortedArr = generateNewArray(200, 1, 200);
      const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
      const unsortedArrCopy = [...valuesToSort];
      quickSortWrapper(valuesToSort);
      expect(valuesToSort).toEqual(unsortedArrCopy);
    });
  });
});
describe.only("heapSort", () => {
  it.skip("should return a sorted array", () => {
    const unsortedArr = generateNewArray(200, 1, 200);
    const valuesToSort = unsortedArr.map((valueObj) => valueObj.value);
    const sorted = [...valuesToSort].sort((a, b) => a - b);
    expect(heapSortWrapper(valuesToSort).sortedArray).toEqual(sorted);
  });
  describe("buildMaxHeap", () => {
    it("should return a max heap for a given array", () => {
      const input = [4, 10, 3, 5, 1];
      const expectedOutput = [10, 5, 3, 4, 1];
      expect(buildMaxHeap(input)).toEqual(expectedOutput);
      const input2 = [1, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17];
      const expectedOutput2 = [17, 15, 13, 9, 6, 5, 10, 4, 8, 3, 1];
      expect(buildMaxHeap(input2)).toEqual(expectedOutput2);
    });
  });
});
