import { getBrighterColor } from './getBrighterColor';

export function convertToDuoTone(colors, customImage) {
  var value = [];
  var sorted = getBrighterColor(colors);
  var light = customImage ? colors[0] : sorted.lighter;
  var dark = customImage ? colors[1] : sorted.darker;
  value = value.concat([
    light[0] / 256 - dark[0] / 256,
    0,
    0,
    0,
    dark[0] / 256
  ]);
  value = value.concat([
    light[1] / 256 - dark[1] / 256,
    0,
    0,
    0,
    dark[1] / 256
  ]);
  value = value.concat([
    light[2] / 256 - dark[2] / 256,
    0,
    0,
    0,
    dark[2] / 256
  ]);
  value = value.concat([0, 0, 0, 1, 0]);
  return value.join(" ");
}
