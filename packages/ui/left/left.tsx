import { Component, createElement } from "react";
import styles from "./index.scss";
import { SvgIconButton } from "../button/svgIconButton";
import { ToolBox } from "../toolbox/ToolBox";
import { take, skip } from "rxjs/operators";
import { Subscription } from "rxjs";
import leftState from "./state";
export class Left extends Component<any, any> {
  static defaultProps: any = {
    className: styles.left
  };
  subscription: Subscription;
  constructor(props: any) {
    super(props);
    leftState.pipe(take(1)).subscribe(res => {
      this.state = res;
    });
  }
  componentDidMount() {
    this.subscription = leftState.pipe(skip(1)).subscribe(res => {
      this.setState(res);
    });
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  render() {
    const { className } = this.state;
    const { className: className2, ...props } = this.props;
    return (
      <div className={styles.left_container}>
        <div className={styles.left_quick}>
          <button>模板</button>
        </div>
        <div className={className} {...props}>
          <ToolBox />
          <div className={styles.left_row}>
            <SvgIconButton
              onClick={this.drawLine}
              svg={"//file.ih5.cn/v3/pixel/5bfb9c99/img/icons/ellipse.svg"}
            />
            <SvgIconButton
              svg={"//file.ih5.cn/v3/pixel/5bfb9c99/img/icons/line.svg"}
            />
          </div>
        </div>
      </div>
    );
  }

  drawLine(e: any) {
    console.log(e.target);
  }
}
