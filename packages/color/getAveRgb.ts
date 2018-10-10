import { convert as _convert } from "./convert";
export function getAveRgb(a: number[], b: number[], convert: any = _convert) {
  let result = a.map((n, index) => {
    return (n + b[index]) / 2;
  });
  if (convert) {
    result = convert("lab", "rgb")(result);
    result = result.map(function(n) {
      return +n.toFixed(0);
    });
  }
  return result;
}
