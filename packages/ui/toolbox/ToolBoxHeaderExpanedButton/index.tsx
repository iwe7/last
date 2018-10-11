import { Component, createElement } from "react";
import { ToolBoxButton } from "../ToolBoxButton";
import styles from "./index.scss";

export class ToolBoxHeaderExpanedButton extends Component {
  render() {
    return <ToolBoxButton className={styles.button} />;
  }
}
