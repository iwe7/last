import { Component, createElement } from "react";
import styles from "./index.scss";
export class HRuler extends Component {
  render() {
    return (
      <div className={styles.h_ruler_wraper}>
        <ul className={styles.h_ruler}>
          <li>0</li>
          <li>100</li>
          <li>200</li>
          <li>300</li>
          <li>400</li>
          <li>500</li>
          <li>600</li>
        </ul>
      </div>
    );
  }
}
