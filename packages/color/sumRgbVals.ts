export function sumRgbVals(arr: number[]) {
  return arr.reduce((a, b) => {
    return a + b;
  }, 0);
}
