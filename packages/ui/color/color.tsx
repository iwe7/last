import { Component, createElement } from "react";
import { buildQueries } from "../../color/buildQueries";
import { ColorItem } from "./colorItem";
import { classify, genNewColor } from "../../color/index";
import { fromEvent, animationFrameScheduler } from "rxjs";
import { observeOn, filter } from "rxjs/operators";
import styles from "./color.scss";
export class Color extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      colors: buildQueries()
    };
  }
  componentDidMount() {
    const container: any = this.refs.galleryContainer;
    fromEvent(container, "scroll")
      .pipe(
        filter(() => {
          return (
            container.clientHeight + container.scrollTop >=
            container.scrollHeight - 5
          );
        }),
        observeOn(animationFrameScheduler)
      )
      .subscribe(() => {
        this.setState({
          colors: [...this.state.colors, ...buildQueries()]
        });
      });
  }
  render() {
    return (
      <div ref="galleryContainer" className={styles.galleryContainer}>
        {this.state.colors.map((item, index) => {
          const color = genNewColor(item);
          const desc = classify(color);
          const attrs = {
            className: styles.block,
            style: {
              backgroundColor: `rgb(${color})`,
              color: `rgb(${color})`
            },
            _desc: desc
          };
          return <ColorItem key={index} {...attrs} />;
        })}
      </div>
    );
  }
}
