import { Component, createElement } from "react";
import styles from "./index.scss";

export class Left extends Component {
  static defaultProps: any = {
    className: styles.left
  };
  render() {
    return (
      <div className={styles.left_container}>
        <div className={styles.left_quick} />
        <div {...this.props} />
      </div>
    );
  }
}
