const banList = [];
import { generate } from "./generate";
export function genNewColor(query: any) {
  let color = generate("rgb", query);
  while (!isNewColor(color)) {
    console.log("trying again");
    color = generate("rgb", query);
  }
  return color;
}
import { getColorName } from "./getColorName";
export function isNewColor(color: string) {
  banList.forEach(function(b) {
    if (getColorName(color) === b) {
      console.log("repeat");
      return false;
    }
  });
  return true;
}
