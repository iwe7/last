import { Component, createElement } from "react";
import styles from "./index.scss";
import { px2vw } from "../const";

export class Quick extends Component {
  static defaultProps: any = {
    className: styles.quick,
    style: {
      width: `260px`,
      top: `37px`,
      left: `66px`,
      backgroundColor: `#232323`
    }
  };
  render() {
    return (
      <div {...this.props}>
        <div className={styles.header}>quick header</div>
      </div>
    );
  }
}
