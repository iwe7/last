import { shuffle } from "../utils/shuffle";
import { buildPropObject } from "./buildPropObject";
export const generationDist = {
  hue: {
    red: 3,
    orange: 3,
    yellow: 3,
    green: 3,
    cyan: 3,
    blue: 3,
    violet: 3,
    magenta: 3
  },
  sat: {
    rich: 8,
    muted: 8,
    pale: 5,
    neutral: 3
  },
  lum: {
    light: 6,
    midtone: 12,
    dark: 6
  }
};
export const AMOUNT = 24;

export function buildQueries() {
  const queries = [];
  const hues = shuffle(buildPropObject(generationDist.hue));
  const sats = shuffle(buildPropObject(generationDist.sat));
  const lums = shuffle(buildPropObject(generationDist.lum));

  for (let i = 0; i < AMOUNT; i++) {
    queries.push(`${lums[i]} ${sats[i]} ${hues[i]}`);
  }

  return queries;
}
