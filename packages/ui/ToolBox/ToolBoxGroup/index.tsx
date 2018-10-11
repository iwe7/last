import { Component, createElement } from "react";
import styles from "./index.scss";
export class ToolBoxGroup extends Component<any, any> {
  static defaultProps: any = {
    className: styles.group
  };
  render() {
    const { children, ...props } = this.props;
    return <li {...props}>{children}</li>;
  }
}
