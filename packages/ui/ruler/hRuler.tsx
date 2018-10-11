import { Component, createElement } from "react";
import styles from "./index.scss";
import state from "./state";
import { fromEvent, animationFrameScheduler } from "rxjs";
import { switchMap, takeUntil, observeOn, map, tap } from "rxjs/operators";
export class HRuler extends Component {
  componentDidMount() {
    const ruler: HTMLElement = this.refs.ruler as any;
    const mousedown = fromEvent(ruler, "mousedown").pipe(
      map((res: any) => res.pageY),
      tap(() => {
        state.dispatch("AddHLine", 0);
      })
    );
    const mouseup = fromEvent(document.body, "mouseup").pipe(
      tap(() => {
        state.dispatch("CheckHLine");
      })
    );
    const mousemove = fromEvent(document.body, "mousemove");
    mousedown
      .pipe(
        switchMap((start: any) =>
          mousemove.pipe(
            takeUntil(mouseup),
            map((move: any) => move.pageY - start)
          )
        ),
        observeOn(animationFrameScheduler)
      )
      .subscribe(res => {
        state.dispatch("UpdateHLine", res);
      });
  }
  render() {
    return (
      <div ref="ruler" className={styles.h_ruler_wraper}>
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
