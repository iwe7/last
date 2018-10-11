import { Component, createElement } from "react";
export interface IHLineItem {
  top: number;
  index: number;
}
import styles from "./index.scss";
import { fromEvent, Subscription } from "rxjs";
import { switchMap, takeUntil, map, tap } from "rxjs/operators";
import state from "./state";
export class HLineItem extends Component<IHLineItem, any> {
  subscription: Subscription[] = [];
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    const ele: HTMLElement = this.refs.item as any;
    let oldTop: number = 0;
    let tmpTop: number = 0;
    const mousedown = fromEvent(ele, "mousedown").pipe(
      map((res: any) => res.pageY),
      tap(() => {
        oldTop = tmpTop || this.props.top;
        state.dispatch("setCurrentIndex", this.props.index);
      })
    );
    const mousemove = fromEvent(document.body, "mousemove").pipe(
      map((res: any) => res.pageY)
    );
    const mouseup = fromEvent(document.body, "mouseup").pipe(
      tap(() => {
        oldTop = tmpTop;
        state.dispatch("CheckHLine");
      })
    );
    this.subscription.push(
      mousedown
        .pipe(
          switchMap(start =>
            mousemove.pipe(
              map(move => move - start),
              takeUntil(mouseup)
            )
          )
        )
        .subscribe(res => {
          tmpTop = oldTop + res;
          state.dispatch("UpdateHLine", tmpTop);
        })
    );
  }
  componentWillUnmount() {
    this.subscription.map(res => res.unsubscribe());
  }
  render() {
    const style = {
      top: `${this.props.top}px`
    };
    return (
      <div
        key={this.props.index}
        ref="item"
        className={styles.h_line}
        style={style}
        draggable={false}
      >
        <div />
      </div>
    );
  }
}
