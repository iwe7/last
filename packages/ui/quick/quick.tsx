import { Component, createElement } from "react";
import styles from "./index.scss";
export class Quick extends Component {
  render() {
    return (
      <div className={styles.quick}>
        <div className={styles.header}>quick header</div>
      </div>
    );
  }
}
