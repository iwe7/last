import { appStore } from "../../store";

export interface IPreviewState {
  top: number;
  scale: number;
  bg: string;
}
export const previewDefault = {
  top: 14,
  scale: 1,
  bg: "#fff"
};
export const previewHandler = (type: string, value: any, old: any) => {
  switch (type) {
    case "wheel":
      return { ...old, top: old.top - value };
    case "scale":
      return { ...old, scale: old.scale + value };
    default:
      return { ...old, ...value };
  }
};
export const state = appStore.of("preview", previewHandler, previewDefault);
export default state;
export function scale(value: number) {
  state.dispatch("scale", value);
}
export function wheel(value: number) {
  state.dispatch("wheel", value);
}
