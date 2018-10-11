import { appStore } from "../../store/action";
export interface IRulerState {
  hLines: number[];
  vLines: number[];
  top: number;
  lineIndex: number;
}
export const rulerDefault = {
  hLines: [-1],
  vLines: [-1],
  top: 0,
  lineIndex: 0
};
export const rulerHandler = (type: string, value: any, old: IRulerState) => {
  let lines = old.hLines;
  switch (type) {
    case "AddHLine":
      old.lineIndex++;
      return { ...old, hLines: [...old.hLines, value] };
    case "UpdateHLine":
      lines[old.lineIndex] = value;
      return { ...old, hLines: lines };
    case "setCurrentIndex":
      return { ...old, lineIndex: value };
    case "CheckHLine":
      lines = lines.filter((val, index) => {
        if (val > 0) {
          return true;
        } else {
          return index === 0;
        }
      });
      return { ...old, hLines: lines, lineIndex: lines.length - 1 };
    case "AddVLine":
      return { ...old, vLines: [...old.vLines, value] };
    default:
      return { ...old, ...value };
  }
};
export default appStore.of("ruler", rulerHandler, rulerDefault);
