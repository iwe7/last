import { Component, createElement } from "react";
import styles from "./index.scss";
import { ToolBoxHeaderExpanedButton } from '../ToolBoxHeaderExpanedButton';
export class ToolBoxHeader extends Component {
  render() {
    return (
      <div className={styles.header}>
        <ToolBoxHeaderExpanedButton />
      </div>
    );
  }
}
