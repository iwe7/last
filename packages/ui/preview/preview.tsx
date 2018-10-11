import { Component, createElement } from "react";
import styles from "./index.scss";
import { fromEvent } from "rxjs";
import { scan } from "rxjs/operators";

export class Preview extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      points: []
    };
  }
  componentDidMount() {
    const preview: any = this.refs.preview;
    fromEvent(preview, "click").subscribe((res: any) => {
      const point = {
        x: res.offsetX,
        y: res.offsetY
      };
      this.setState({
        points: [...this.state.points, point]
      });
      console.log(this.state.points);
    });
  }
  render() {
    return (
      <div ref="preview" className={styles.preview}>
        {this.props.children}
      </div>
    );
  }
}
