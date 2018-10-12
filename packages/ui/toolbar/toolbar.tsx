import { Component, createElement } from "react";
import styles from "./index.scss";
import * as preview from "../preview/state";
export class Toolbar extends Component {
  render() {
    return (
      <div className={styles.toolbar}>
        <button onClick={e => preview.scale(-0.01)}>缩小</button>
        <button onClick={e => preview.scale(0.01)}>发大</button>
        <button onClick={e => this.createElement()}>新建元素</button>
        <button onClick={e => this.createPage()}>新建页面</button>
      </div>
    );
  }

  createElement() {}
  createPage() {}
}
