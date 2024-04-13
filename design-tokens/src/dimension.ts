export const parseDimension = (inputDimension: string): number => {
  if (!inputDimension.match(/^\d+(\.\d+)?(px|rem)$/)) {
    throw new Error("Invalid dimension format");
  }

  const [value, unit] = inputDimension.split(/(px|rem)/);
  const parsedValue = parseFloat(value);

  if (unit === "px") {
    return parsedValue;
  }

  return parsedValue * 16;
};
