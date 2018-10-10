import { convert } from "./convert";
import { HUE, SATURATION, LUMINOSITY } from "./const";
import { IBaseline } from "./translateQueryString";
export function classify(rgb: number[]): IBaseline {
  let hsl = convert("rgb", "hsl")(rgb);
  let roundHsl = hsl[0].toFixed(3);
  hsl[0] = roundHsl <= 0.056 ? hsl[0] + 1 : hsl[0];
  let color = {
    hue: Math.round(hsl[0] * 360),
    sat: hsl[1],
    lum: hsl[2]
  };

  let getType = (value: any, type: any) => {
    let result;
    for (let prop in type) {
      let inRange =
        value.toFixed(2) >= type[prop][0] && value.toFixed(2) <= type[prop][1];
      if (inRange) {
        result = prop;
        return result;
      }
    }
    console.log("got one");
    return `${value} unknown`;
  };
  return {
    hue: getType(color.hue, HUE),
    sat: getType(color.sat, SATURATION),
    lum: getType(color.lum, LUMINOSITY)
  };
}
