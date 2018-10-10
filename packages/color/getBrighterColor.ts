import { sumRgbVals } from "./sumRgbVals";
export function getBrighterColor(colors: any[]) {
  let sumA = sumRgbVals(colors[0]);
  let sumB = sumRgbVals(colors[1]);
  let light = sumA > sumB ? colors[0] : colors[1];
  let dark = sumB > sumA ? colors[0] : colors[1];
  return {
    lighter: light,
    darker: dark
  };
}
