import { Component, createElement } from "react";
import styles from "./color.scss";

export class ColorItem extends Component<any, any> {
  static defaultProps: any = {
    className: "block"
  };
  key: string = new Date().getTime() + "";
  selectColor(e: any) {}
  render() {
    const props = {
      className: this.props.className,
      onClick: this.selectColor,
      style: this.props.style
    };
    const desc = this.props._desc;
    return (
      <div {...props}>
        <span className={styles.blockDescription}>
          {`${desc.sat} ${desc.lum} ${desc.hue}`}
        </span>
      </div>
    );
  }
}
export default ColorItem;
