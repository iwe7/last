import { Component, createElement } from "react";
import svg from './draw_circle.svg';
export class DrawCircle extends Component {
  render() {
    const style = {
      backgroundImage: `url(${svg})`,
      width: `30px`,
      height: `30px`,
      backgroundSize: `cover`,
      border: `none`,
      outline: `none`,
      backgroundColor: `#353535`,
      fill: "#fff"
    };
    return <button style={style} />;
  }
}
