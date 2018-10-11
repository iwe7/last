import { Component, createElement } from "react";
import styles from "./index.scss";
import state, { IRulerState } from "./state";
import { take, skip } from "rxjs/operators";
import { Subscription } from "rxjs";
export class VLine extends Component<any, IRulerState> {
  subscription: Subscription[] = [];

  constructor(props: any) {
    super(props);
    state.pipe(take(1)).subscribe(res => (this.state = res));
    this.subscription.push(
      state.pipe(skip(1)).subscribe(res => this.setState(res))
    );
  }
  componentDidMount() {}
  componentWillUnmount() {
    this.subscription.map(res => res.unsubscribe());
    this.subscription = [];
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
