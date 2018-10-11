import { appStore } from "../../store/action";

export interface IRulerState {
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
    default:
      return { ...old, ...value };
  }
};
export default appStore.of("preview", previewHandler, previewDefault);
