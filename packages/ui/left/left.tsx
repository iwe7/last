import { Component, createElement } from "react";
import styles from "./index.scss";

import { px2vw } from "../const";

export class Left extends Component {
  static defaultProps: any = {
    className: styles.left
  };
  render() {
    return <div {...this.props} />;
  }
}
