import { Component, createElement } from "react";
import styles from "./index.scss";
import state from "./state";
import { fromEvent, animationFrameScheduler, Subscription } from "rxjs";
import { switchMap, takeUntil, observeOn, map, tap } from "rxjs/operators";
import * as tooltip from "../tooltip/state";
export class HRuler extends Component {
  subscription: Subscription[] = [];
  componentDidMount() {
    const ruler: HTMLElement = this.refs.ruler as any;
    const mousedown = fromEvent(ruler, "mousedown").pipe(
      map((res: MouseEvent) => {
        res.stopPropagation();
        res.preventDefault();
        return res.pageY;
      }),
      tap(() => {
        state.dispatch("AddHLine", 0);
      })
    );
    const mouseup = fromEvent(document.body, "mouseup").pipe(
      tap(() => {
        state.dispatch("CheckHLine");
        tooltip.hide();
      })
    );
    const mousemove = fromEvent(document.body, "mousemove");
    this.subscription.push(
      mousedown
        .pipe(
          switchMap((start: any) =>
            mousemove.pipe(
              takeUntil(mouseup),
              tap((res: any) =>
                tooltip.update({
                  left: res.pageX,
                  top: res.pageY
                })
              ),
              map((move: any) => move.pageY - start)
            )
          ),
          observeOn(animationFrameScheduler)
        )
        .subscribe(res => {
          state.dispatch("UpdateHLine", res);
          tooltip.update({
            tip: `${res}`
          });
        })
    );
  }
  componentWillUnmount() {
    this.subscription.map(res => res.unsubscribe());
    this.subscription = [];
  }
  render() {
    return (
      <div ref="ruler" draggable={false} className={styles.h_ruler_wraper}>
        <ul className={styles.h_ruler}>
          <li>0</li>
          <li>100</li>
          <li>200</li>
          <li>300</li>
          <li>400</li>
          <li>500</li>
          <li>600</li>
        </ul>
      </div>
    );
  }
}
