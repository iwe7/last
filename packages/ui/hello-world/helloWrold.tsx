import { createElement } from "react";
import styles from "./index.scss";
import { Color } from "../color/color";
import { Ruler } from "../ruler/ruler";
import { Toolbar } from "../toolbar/toolbar";
import { Preview } from "../preview/preview";
import { Quick } from "../quick/quick";
import { Left } from "../left/left";
import { Right } from "../right/right";


export function HelloWorld() {
  return (
    <div className={styles.helloWorld}>
      <Toolbar />
      <Left />
      <Quick />
      <Right />
    </div>
  );
}
