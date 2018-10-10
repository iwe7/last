import { Component, createElement } from "react";
import styles from "./index.scss";
import { px2vw } from "../const";

export class Right extends Component {
  static defaultProps: any = {
    className: styles.right,
    style: {

    }
  };
  render() {
    return <div {...this.props} />;
  }
}
