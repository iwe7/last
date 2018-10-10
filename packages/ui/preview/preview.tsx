import { Component, createElement } from "react";
import styles from "./index.scss";
import { px2vw } from "../const";
export class Preview extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <div className={styles.preview} />;
  }
}
