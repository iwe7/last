import { appStore } from "../../store/action";
export interface IToolTipState {
  tip?: string;
  left?: number;
  top?: number;
  show?: boolean;
}
export const tooltipHandler = (
  type: string,
  value: IToolTipState,
  old: IToolTipState
) => {
  switch (type) {
    case "updateTip":
      return { ...old, tip: value.tip };
    case "update":
      return { ...old, top: value.top, left: value.left, show: true, ...value };
    case "show":
      return { ...old, show: true, ...value };
    case "hide":
      return { ...old, show: false };
    default:
      return { ...old, ...value };
  }
};
export const toolTipDefault = {
  show: false,
  tip: ""
};
export const state = appStore.of("tooltip", tooltipHandler, toolTipDefault);
export function show() {
  state.dispatch("show");
}
export function update(pos: IToolTipState) {
  state.dispatch("update", pos);
}
export function hide() {
  state.dispatch("hide");
}
export default state;
