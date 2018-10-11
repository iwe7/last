import { Component, createElement } from "react";
import styles from "./index.scss";
import classnames from "classnames";
export class Center extends Component<any, any> {
  static defaultProps: any = {
    className: styles.center,
    relative: false
  };
  render() {
    let { className, relative, ...props } = this.props;
    if (relative) className = classnames(styles.center, styles.relative);
    return <div className={className} {...props} />;
  }
}
