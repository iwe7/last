import { Component, createElement } from "react";
import { ToolBoxButtonGroup } from "../ToolBoxButtonGroup";
import styles from "./index.scss";
export class ToolBoxGroupButtonGroup extends Component<any, any> {
  static defaultProps: any = {
    className: styles.group
  };
  render() {
    const { children, className, ...props } = this.props;
    return (
      <ToolBoxButtonGroup {...props} className={className}>
        {children}
      </ToolBoxButtonGroup>
    );
  }
}
