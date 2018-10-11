import { Component, createElement } from "react";
import styles from "./index.scss";
import classNames from "classnames";
export interface ToolBoxButtonProps {
  className: string;
  name: string;
  img: string;
  active: string;
}
export class ToolBoxButton extends Component<any, any> {
  static defaultProps: any = {
    className: "ToolBoxButtonPrimary",
    name: "",
    img: ""
  };
  render() {
    const { className } = this.props;
    return <button className={classNames(styles.button, className)} />;
  }
  name(title: string) {
    return <span className={styles.name}>{title}</span>;
  }
  image(img: string) {
    return <img className={styles.img} src={img} />;
  }
}
