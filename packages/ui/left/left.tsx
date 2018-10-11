import { Component, createElement } from "react";
import styles from "./index.scss";
import { SvgIconButton } from "../button/svgIconButton";
import { ToolBox } from "../ToolBox/ToolBox";

export class Left extends Component {
  static defaultProps: any = {
    className: styles.left
  };
  render() {
    return (
      <div className={styles.left_container}>
        <div className={styles.left_quick}>
          <button>模板</button>
        </div>
        <div {...this.props}>
          <ToolBox />
          <div className={styles.left_row}>
            <SvgIconButton
              onClick={this.drawLine}
              svg={"//file.ih5.cn/v3/pixel/5bfb9c99/img/icons/ellipse.svg"}
            />
            <SvgIconButton
              svg={"//file.ih5.cn/v3/pixel/5bfb9c99/img/icons/line.svg"}
            />
          </div>
        </div>
      </div>
    );
  }

  drawLine(e: any) {
    console.log(e.target);
  }
}
