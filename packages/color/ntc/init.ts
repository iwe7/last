import { names } from "./names";
import { rgb as _rgb } from "./rgb";
import { hsl as _hsl } from "./hsl";

export function init() {
  let color, rgb, hsl;
  for (var i = 0; i < names.length; i++) {
    color = "#" + names[i][0];
    rgb = _rgb(color);
    hsl = _hsl(color);
    names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
  }
}
