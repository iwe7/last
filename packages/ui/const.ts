export const PC = 1280;
export const MOBILE = 750;
export const PX = 1 / 12.8;
export const UNIT = 12.8;
export const designWidth = MOBILE / UNIT;
export const designHeight = 1040 / UNIT;
export const topHeight = 37 / UNIT;
const cache: Map<any, any> = new Map();
export function px2vw(px: number) {
  if (cache.has(px)) {
    return cache.get(px);
  } else {
    const val = px / UNIT;
    cache.set(px, val);
    return val;
  }
}
