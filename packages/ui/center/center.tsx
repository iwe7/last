import { Component, createElement } from "react";
import styles from "./index.scss";
export class Center extends Component {
  static defaultProps: any = {
    className: styles.center
  };
  render() {
    return <div {...this.props} />;
  }
}
