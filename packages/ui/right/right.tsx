import { Component, createElement } from "react";
import styles from "./index.scss";
import { px2vw } from "../const";
import { RightToolbar } from "./rightToolbar";
import { RightContent } from "./rightContent";
import { RightHeader } from "./rightHeader";
import { RightFooter } from "./rightFooter";

export class Right extends Component {
  static defaultProps: any = {
    className: styles.right,
    style: {}
  };
  render() {
    return (
      <div {...this.props}>
        <RightHeader />
        <div className={styles.right_container}>
          <RightContent />
          <RightToolbar />
        </div>
        <RightFooter />
      </div>
    );
  }
}
