import { Component, createElement } from "react";
export interface IHLineItem {
  top: number;
  index: number;
  base?: number;
}
import styles from "./index.scss";
import { fromEvent, Subscription, merge, animationFrameScheduler } from "rxjs";
import {
  switchMap,
  takeUntil,
  map,
  tap,
  skip,
  take,
  pluck,
  filter,
  observeOn
} from "rxjs/operators";
import previewState from "../preview/state";
import state from "./state";
export class HLineItem extends Component<IHLineItem, IHLineItem> {
  subscription: Subscription[] = [];
  constructor(props: any) {
    super(props);
    this.state = {
      ...props,
      base: 14
    };
    previewState
      .pipe(
        take(1),
        map(res => res.top)
      )
      .subscribe(res => {
        this.state = {
          ...this.state,
          base: res
        };
      });
    this.subscription.push(
      state
        .pipe(
          skip(1),
          pluck("hLines"),
          map(res => {
            return res[this.props.index];
          }),
          filter(res => res !== this.state.top)
        )
        .subscribe(res => {
          this.setState({ top: res });
        })
    );
    this.subscription.push(
      previewState
        .pipe(
          skip(1),
          map(res => res.top),
          tap(res => {
            this.setState({
              base: res
            });
          })
        )
        .subscribe()
    );
  }
  componentDidMount() {
    const ele: HTMLElement = this.refs.item as any;
    let oldTop: number = 0;
    let tmpTop: number = 0;
    const mousedown = fromEvent(ele, "mousedown");

    const start = merge(mousedown).pipe(
      map((res: any) => res.pageY),
      tap(() => {
        oldTop = tmpTop > 0 ? tmpTop : this.props.top;
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
      start
        .pipe(
          switchMap(start =>
            merge(mousemove).pipe(
              map(move => move - start),
              takeUntil(mouseup),
              observeOn(animationFrameScheduler)
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
      top: `${this.state.top + this.state.base}px`
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
