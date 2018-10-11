import { Component, createElement } from "react";
import styles from "./index.scss";
import classnames from "classnames";

export class ToolBoxButtonGroup extends Component<any, any> {
  static defaultProps: any = {
    className: ''
  };
  render() {
    let { children, className, ...props } = this.props;
    className = classnames(styles.group, className);
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }
}
