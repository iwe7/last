import { Component, createElement } from "react";
import styles from "./index.scss";
import { fromEvent, merge, animationFrameScheduler, Subscription } from "rxjs";
import {
  takeUntil,
  switchMap,
  observeOn,
  map,
  take,
  skip
} from "rxjs/operators";
import { VLine } from "../ruler/vLine";
import { HLine } from "../ruler/hLine";

import state, { IRulerState } from "./state";
export class PreviewContainer extends Component<any, IRulerState> {
  static defaultProps: any = {
    className: styles.previewContainer
  };
  subscription: Subscription[] = [];
  constructor(props: any) {
    super(props);
    state.pipe(take(1)).subscribe(res => (this.state = res));
    this.subscription.push(
      state.pipe(skip(1)).subscribe(res => this.setState(res))
    );
  }
  componentDidMount() {
    const container: HTMLDivElement = this.refs.previewContainer as any;
    const wheel = fromEvent(container.parentElement, "wheel").pipe(
      map((res: any) => res.deltaY)
    );
    this.subscription.push(
      merge(wheel)
        .pipe(observeOn(animationFrameScheduler))
        .subscribe(res => state.dispatch("wheel", res))
    );
  }
  componentWillUnmount() {
    this.subscription.map(res => res.unsubscribe());
  }
  render() {
    const style = {
      top: `${this.state.top}px`,
      transform: `scale(${this.state.scale})`,
      backgroundColor: `${this.state.bg}`
    };

    return (
      <div className={styles.previewWraper}>
        <VLine />
        <div ref="previewContainer" {...this.props} style={style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
