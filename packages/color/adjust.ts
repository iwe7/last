import { convert } from "./convert";
export function adjust(rgb: number[], delta: number) {
  let lab = convert("rgb", "lab")(rgb);
  lab[0] += delta * 50;
  let result = convert("lab", "rgb")(lab).map(n => {
    return Math.round(n);
  });
  return result;
}
