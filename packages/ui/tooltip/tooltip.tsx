import { Component, createElement } from "react";
import state, { IToolTipState } from "./state";
import { skip, take } from "rxjs/operators";
import { Subscription } from "rxjs";
import styles from "./index.scss";
export class ToolTip extends Component<IToolTipState, IToolTipState> {
  subscription: Subscription[] = [];
  constructor(props: any) {
    super(props);
    this.state = {
      ...props
    };
    state.pipe(take(1)).subscribe(
      res =>
        (this.state = {
          ...this.state,
          ...res
        })
    );
    this.subscription.push(
      state.pipe(skip(1)).subscribe(res => {
        this.setState(res);
      })
    );
  }
  componentWillUnmount() {
    this.subscription.map(res => res.unsubscribe());
    this.subscription = [];
  }
  render() {
    const { tip, left, top, show, ...props } = this.state;
    const style = {
      display: show ? "inline-block" : "none",
      left: `${left + 15}px`,
      top: `${top - 14}px`
    };
    return (
      <div className={styles.tooltip} style={style} {...props}>
        {tip}
      </div>
    );
  }
}
