import { generateNewArray } from "./arrays";

describe("generateNewArray", () => {
  it("should return an array of the specified length", () => {
    expect(generateNewArray(100, 5, 50).length).toBe(50);
  });
  it("should return an array with no values outside the specified bounds", () => {
    const testArray = generateNewArray(100, 5, 50);
    const max = Math.max(...testArray);
    const min = Math.min(...testArray);
    expect(max).toBeLessThan(101);
    expect(min).toBeGreaterThan(4);
  });
});
