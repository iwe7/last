import { convert } from "./convert";
import * as ntc from "./ntc/index";

export function getColorName(color: any) {
  var hex = convert("rgb", "hex")(color);
  var result = ntc.name(`#${hex}`);
  var colorName = result[1];
  return colorName;
}
