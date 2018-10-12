import { appStore } from "../../store";
import styles from "./index.scss";
import classnames from "classnames";
export interface ILeftState {
  // 是否展开
  open: boolean;
}
export const leftHandler = (type: string, value: any, old: any) => {
  switch (type) {
    case "close":
      return {
        ...old,
        ...value,
        className: classnames(styles.left, styles.close)
      };
    case "open":
      return {
        ...old,
        ...value,
        className: styles.left
      };
    default:
      return { ...old, ...value };
  }
};
export default appStore.of("left", leftHandler, {
  className: styles.left
});
