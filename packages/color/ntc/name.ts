import { rgb as _rgb } from "./rgb";
import { hsl as _hsl } from "./hsl";
import { names } from "./names";
export function name(color: string) {
  color = color.toUpperCase();
  if (color.length < 3 || color.length > 7)
    return ["#000000", "Invalid Color: " + color, false];
  if (color.length % 3 == 0) color = "#" + color;
  if (color.length == 4)
    color =
      "#" +
      color.substr(1, 1) +
      color.substr(1, 1) +
      color.substr(2, 1) +
      color.substr(2, 1) +
      color.substr(3, 1) +
      color.substr(3, 1);

  let rgb = _rgb(color);
  let r = rgb[0],
    g = rgb[1],
    b = rgb[2];
  let hsl = _hsl(color);
  let h = hsl[0],
    s = hsl[1],
    l = hsl[2];
  let ndf1 = 0;
  let ndf2 = 0;
  let ndf = 0;
  let cl = -1,
    df = -1;

  for (let i = 0; i < names.length; i++) {
    if (color == "#" + names[i][0])
      return ["#" + names[i][0], names[i][1], true];
    ndf1 =
      Math.pow(r - names[i][2], 2) +
      Math.pow(g - names[i][3], 2) +
      Math.pow(b - names[i][4], 2);
    ndf2 =
      Math.pow(h - names[i][5], 2) +
      Math.pow(s - names[i][6], 2) +
      Math.pow(l - names[i][7], 2);
    ndf = ndf1 + ndf2 * 2;
    if (df < 0 || df > ndf) {
      df = ndf;
      cl = i;
    }
  }

  return cl < 0
    ? ["#000000", "Invalid Color: " + color, false]
    : ["#" + names[cl][0], names[cl][1], false];
}
