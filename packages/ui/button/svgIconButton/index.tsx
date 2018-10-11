import { Component, createElement } from "react";
import styles from "./index.scss";
export class SvgIconButton extends Component<any, any> {
  static defaultProps: any={
    onClick: ()=>{}
  }
  render() {
    const { svg,onClick,...props } = this.props;
    return (
      <button onClick={e=>onClick(e)}{...props} className={styles.button}>
        <img src={svg} />
        <span />
      </button>
    );
  }
}
