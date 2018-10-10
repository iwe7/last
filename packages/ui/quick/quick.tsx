import { Component, createElement } from "react";
import styles from "./index.scss";
import svg from "./menu.svg";
export class Quick extends Component {
  static defaultProps: any = {
    className: styles.quick,
    style: {
      width: `260px`,
      top: `37px`,
      left: `66px`,
      backgroundColor: `#232323`
    }
  };
  render() {
    const style = {
      backgroundImage: `url(${svg})`
    };
    return (
      <div {...this.props}>
        <div className={styles.header}>
          quick header
          <button style={style} />
        </div>
      </div>
    );
  }
}
