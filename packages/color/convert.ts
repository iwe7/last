import { hue2rgb } from "./hue2rgb";
export function convert(
  from: "hex" | "hsl" | "lab" | "hsv" | "frgb" | "rgb",
  to: "hex" | "hsl" | "lab" | "hsv" | "frgb" | "rgb" | "yuv"
) {
  switch (from) {
    case "hex":
      if (to === "rgb") {
        return (hex: string) => {
          hex = hex.replace("#", "");
          return [
            parseInt(hex.substring(0, 2), 16),
            parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16)
          ];
        };
      } else {
        return (hex: string) => convert("rgb", to)("hex", "rgb")(hex);
      }
    case "hsl":
      if (to === "rgb") {
        return (hsl: number[]) => {
          let h = hsl[0];
          let s = hsl[1];
          let l = hsl[2];
          let r, g, b;

          if (s === 0) {
            r = g = b = l;
          } else {
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
          }

          return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
          ];
        };
      } else {
        return (hsl: number[]) =>
          convert("rgb", to)(convert("hsl", "rgb"))(hsl);
      }
    case "lab":
      if (to === "rgb") {
        return (lab: number[]) => {
          let y = (lab[0] + 16) / 116,
            x = lab[1] / 500 + y,
            z = y - lab[2] / 200,
            r,
            g,
            b;

          x =
            0.95047 *
            (x * x * x > 0.008856 ? x * x * x : (x - 16 / 116) / 7.787);
          y = 1.0 * (y * y * y > 0.008856 ? y * y * y : (y - 16 / 116) / 7.787);
          z =
            1.08883 *
            (z * z * z > 0.008856 ? z * z * z : (z - 16 / 116) / 7.787);

          r = x * 3.2406 + y * -1.5372 + z * -0.4986;
          g = x * -0.9689 + y * 1.8758 + z * 0.0415;
          b = x * 0.0557 + y * -0.204 + z * 1.057;

          r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
          g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
          b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

          return [
            Math.max(0, Math.min(1, r)) * 255,
            Math.max(0, Math.min(1, g)) * 255,
            Math.max(0, Math.min(1, b)) * 255
          ];
        };
      } else {
        return (lab: number[]) =>
          convert("rgb", to)(convert("lab", "rgb"))(lab);
      }
    case "hsv":
      if (to === "rgb") {
        return (hsv: number[]) => {
          let r, g, b;
          let h = hsv[0];
          let s = hsv[1];
          let v = hsv[2];
          let i = Math.floor(h * 6);
          let f = h * 6 - i;
          let p = v * (1 - s);
          let q = v * (1 - f * s);
          let t = v * (1 - (1 - f) * s);

          switch (i % 6) {
            case 0:
              (r = v), (g = t), (b = p);
              break;
            case 1:
              (r = q), (g = v), (b = p);
              break;
            case 2:
              (r = p), (g = v), (b = t);
              break;
            case 3:
              (r = p), (g = q), (b = v);
              break;
            case 4:
              (r = t), (g = p), (b = v);
              break;
            case 5:
              (r = v), (g = p), (b = q);
              break;
          }
          return [r * 255, g * 255, b * 255];
        };
      } else {
        return (hsv: number[]) =>
          convert("rgb", to)(convert("hsv", "rgb"))(hsv);
      }
    case "frgb":
      if (to === "rgb") {
        return (rgb: number[]) =>
          rgb.map(n => {
            return Math.round(n * 255);
          }, 0);
      }
      break;
    case "rgb":
      switch (to) {
        case "hex":
          return (rgb: number[]) => {
            return ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
              .toString(16)
              .slice(1);
          };
        case "frgb":
          return (rgb: number[]) => {
            return rgb.map(n => {
              return n / 255;
            }, 0);
          };
        case "hsl":
          return (rgb: number[]) => {
            let r = rgb[0] / 255;
            let g = rgb[1] / 255;
            let b = rgb[2] / 255;

            let max = Math.max(r, g, b),
              min = Math.min(r, g, b);
            let h,
              s,
              l = (max + min) / 2;

            if (max === min) {
              h = s = 0;
            } else {
              let d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

              switch (max) {
                case r:
                  h = (g - b) / d + (g < b ? 6 : 0);
                  break;
                case g:
                  h = (b - r) / d + 2;
                  break;
                case b:
                  h = (r - g) / d + 4;
                  break;
              }

              h /= 6;
            }
            return [h, s, l];
          };
        case "yuv":
          return (rgb: number[]) => {
            let y = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
            let u =
              rgb[0] * -0.168736 + rgb[1] * -0.331264 + rgb[2] * 0.5 + 128;
            let v =
              rgb[0] * 0.5 + rgb[1] * -0.418688 + rgb[2] * -0.081312 + 128;
            return [y, u, v];
          };
        case "lab":
          return (rgb: number[]) => {
            let r = rgb[0] / 255,
              g = rgb[1] / 255,
              b = rgb[2] / 255,
              x,
              y,
              z;

            r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
            g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
            b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

            x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
            y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
            z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

            x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
            y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
            z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

            return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
          };
        case "hsv":
          return (rgb: number[]) => {
            let r = rgb[0] / 255;
            let g = rgb[1] / 255;
            let b = rgb[2] / 255;

            let max = Math.max(r, g, b),
              min = Math.min(r, g, b);
            let h,
              s,
              v = max;

            let d = max - min;
            s = max === 0 ? 0 : d / max;

            if (max === min) {
              h = 0; // achromatic
            } else {
              switch (max) {
                case r:
                  h = (g - b) / d + (g < b ? 6 : 0);
                  break;
                case g:
                  h = (b - r) / d + 2;
                  break;
                case b:
                  h = (r - g) / d + 4;
                  break;
              }

              h /= 6;
            }

            return [h, s, v];
          };
      }
  }
}
