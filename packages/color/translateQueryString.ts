import { matchToProperty } from "./matchToProperty";
import { HUE, BASELINES, SATURATION, LUMINOSITY, DESCRIPTOR } from "./const";
export interface IBaseline {
  hue?: number[];
  sat?: number[];
  lum?: number[];
}
export function translateQueryString(query: any): IBaseline {
  var descriptors = query.includes(" ") ? query.split(" ") : query;
  var subType = matchToProperty(descriptors, DESCRIPTOR, false);
  var result = {
    hue: matchToProperty(descriptors, HUE, BASELINES.hue),
    sat: subType
      ? subType.sat
      : matchToProperty(descriptors, SATURATION, BASELINES.sat),
    lum: subType
      ? subType.lum
      : matchToProperty(descriptors, LUMINOSITY, BASELINES.lum)
  };
  return result;
}
