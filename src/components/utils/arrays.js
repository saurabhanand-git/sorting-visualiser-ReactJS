export const generateNewArray = (max, min, width) => {
  return Array(width)
    .fill()
    .map(() => Math.round(Math.random() * (max - min) + min));
};
