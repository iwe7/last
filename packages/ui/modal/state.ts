import app from "../../store";
export interface IModalState {
  shown?: boolean;
}
export function modalHandler(
  type: string,
  value: IModalState,
  old: IModalState
) {
  switch (type) {
    default:
      return { ...old, ...value };
  }
}
export const modalDefault: IModalState = {
  shown: false
};

export const state = app.of<IModalState>("modal", modalHandler, modalDefault);
export default state;
// 展示
export function show() {
  state.dispatch("show", { shown: true });
}
// 关闭
export function close() {
  state.dispatch("close", { shown: false });
}
export function set(value: IModalState) {
  state.dispatch("set", value);
}
