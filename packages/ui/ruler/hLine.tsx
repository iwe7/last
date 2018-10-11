import { Component, createElement } from "react";
import styles from "./index.scss";
import state, { IRulerState } from "./state";
import { take, skip, map, tap, switchMap, takeUntil } from "rxjs/operators";
import previewState from "../preview/state";
import { Subscription, merge, fromEvent } from "rxjs";
import { HLineItem } from "./hLineItem";
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
      <div draggable={false}>
        {hLines.map((vline, index) => {
          const top = vline + this.top;
          return <HLineItem key={index} top={top} index={index} />;
        })}
      </div>
    );
  }

  _click(index: any, e?: HTMLElement) {
    const mousedown = fromEvent(e, "mousedown");
    const mousemove = fromEvent(document.body, "mousemove");
    const mouseup = fromEvent(document.body, "mouseup");

    mousedown
      .pipe(
        switchMap(down => {
          console.log("down");
          return mousemove.pipe(takeUntil(mouseup));
        })
      )
      .subscribe(res => {
        console.log(res);
      });
  }
}
