import { IBaseline } from "./translateQueryString";
import { BASELINES } from "./const";
import { handleQuery, isIQuery } from "./handleQuery";
import { randomFloat } from "./randomFloat";
import { convert } from "./convert";
import { isBoolean } from "../type/isBoolean";
export function generate(format, query) {
  let range = handleQuery(query);
  if (isBoolean(query)) {
    if (query && !range) {
      return false;
    }
  } else {
    range = range || BASELINES;
    let h, s, l;
    if (isIQuery(query)) {
      h = query.hue;
      s = query.sat;
      l = query.lum;
    } else if (isBoolean(range)) {
    } else if (isIQuery(range)) {
    } else {
      h = Math.round(randomFloat(range.hue[0], range.hue[1])) / 360;
      s = randomFloat(range.sat[0], range.sat[1]);
      l = randomFloat(range.lum[0], range.lum[1]);
    }
    const result =
      format === "hsl" ? [h, s, l] : convert("hsl", format)([h, s, l]);
    return result;
  }
}
