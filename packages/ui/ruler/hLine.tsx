import { Component, createElement } from "react";
import styles from "./index.scss";
import state, { IRulerState } from "./state";
import { take, skip, map, tap } from "rxjs/operators";
import previewState from "../preview/state";
import { Subscription, merge } from "rxjs";
export class HLine extends Component<any, IRulerState> {
  top: number = 14;
  subscription: Subscription[] = [];
  constructor(props: any) {
    super(props);
    state
      .pipe(
        take(1),
        tap(res => (this.state = res))
      )
      .subscribe();
    const sub = state
      .pipe(
        skip(1),
        tap(res => this.setState(res))
      )
      .subscribe();
    this.subscription.push(sub);
    previewState
      .pipe(
        take(1),
        map(res => res.top)
      )
      .subscribe(res => {
        this.top = res;
      });
    const preview = previewState
      .pipe(
        skip(1),
        map(res => res.top),
        tap(res => {
          this.top = res;
          this.setState({
            top: this.top
          });
        })
      )
      .subscribe();
    this.subscription.push(preview);
  }
  componentWillUnmount() {
    this.subscription.map(res => res.unsubscribe());
  }
  render() {
    const { hLines } = this.state;
    return (
      <div>{hLines.map((vline, index) => this.renderLine(vline, index))}</div>
    );
  }

  renderLine(vline: number, index: number) {
    const style = {
      top: `${vline + this.top}px`
    };
    return (
      <div key={index} className={styles.h_line} style={style}>
        <div />
      </div>
    );
  }
}
