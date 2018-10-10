import { Component, createElement } from "react";
import styles from "./index.scss";
import { fromEvent, merge, animationFrameScheduler } from "rxjs";
import { takeUntil, switchMap, observeOn, map } from "rxjs/operators";

export class PreviewContainer extends Component<any, any> {
  static defaultProps: any = {
    className: styles.previewContainer,
    top: 20,
    scale: 1,
    bg: '#fff'
  };
  constructor(props: any) {
    super(props);
    this.state = {
      top: this.props.top,
      scale: this.props.scale,
      bg: this.props.bg
    };
  }
  componentDidMount() {
    const container: HTMLDivElement = this.refs.previewContainer as any;
    const wheel = fromEvent(container.parentElement, "wheel").pipe(
      map((res: any) => res.deltaY)
    );
    merge(wheel)
      .pipe(observeOn(animationFrameScheduler))
      .subscribe(res =>
        this.setState({
          top: this.state.top - res
        })
      );
  }
  render() {
    const style = {
      top: `${this.state.top}px`,
      transform: `scale(${this.state.scale})`,
      backgroundColor: `${this.state.bg}`
    };
    return <div ref="previewContainer" {...this.props} style={style} />;
  }
}
