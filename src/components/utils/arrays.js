export const generateNewArray = (max, min, width) => {
  return Array(width)
    .fill({ value: 0, class: "" })
    .map((obj) => {
      return { ...obj, value: Math.round(Math.random() * (max - min) + min) };
    });
};
