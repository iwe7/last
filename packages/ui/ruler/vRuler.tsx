import { Component, createElement } from "react";
import styles from "./index.scss";
export class VRuler extends Component {
  render() {
    return (
      <div className={styles.v_ruler_wraper}>
        <ul className={styles.v_ruler}>
          <li>
            <span>0</span>
          </li>
          <li>
            <span>100</span>
          </li>
          <li>
            <span>200</span>
          </li>
          <li>
            <span>300</span>
          </li>
          <li>
            <span>400</span>
          </li>
          <li>
            <span>500</span>
          </li>
          <li>
            <span>600</span>
          </li>
        </ul>
      </div>
    );
  }
}
