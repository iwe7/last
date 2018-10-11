import { Component, createElement } from "react";
import styles from "./index.scss";
export class ToolBoxList extends Component<any, any> {
  static defaultProps: any = {
    className: styles.list
  };
  render() {
    const { children, ...props } = this.props;
    return <ul {...props}>{children}</ul>;
  }
}
