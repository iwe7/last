import { Component, createElement } from "react";
import styles from "./index.scss";
import state, { IRulerState } from "./state";
import { take, skip } from "rxjs/operators";
export class VLine extends Component<any, IRulerState> {
  constructor(props: any) {
    super(props);
    state.pipe(take(1)).subscribe(res => (this.state = res));
  }
  componentDidMount() {
    state.pipe(skip(1)).subscribe(res => this.setState(res));
  }
  render() {
    const { vLines } = this.state;
    return (
      <div>{vLines.map((line, index) => this.renderLine(line, index))}</div>
    );
  }
  renderLine(line: number, index: number) {
    const style = {
      left: `${line}px`
    };
    return (
      <div key={index} className={styles.v_line} style={style}>
        <div />
      </div>
    );
  }
}
