import { createElement } from "react";
import styles from "./index.scss";
import { Color } from "../color/color";

import { HRuler } from "../ruler/hRuler";
import { VRuler } from "../ruler/vRuler";

import { Toolbar } from "../toolbar/toolbar";
import { Preview } from "../preview/preview";
import { Quick } from "../quick/quick";
import { Left } from "../left/left";
import { Right } from "../right/right";
import { Center } from "../center/center";
import { PreviewContainer } from "../preview/previewContainer";
import { HotKeys } from "react-hotkeys";
import {
  SketchPicker
} from "react-color";

export function HelloWorld() {
  return (
    <div className={styles.helloWorld}>
      <Toolbar />
      <HotKeys />
      <Center>
        <Left />
        <Quick />
        <Center>
          <PreviewContainer>
            <SketchPicker />
            <HRuler />
            <VRuler />
            <Preview />
          </PreviewContainer>
        </Center>
        <Right />
      </Center>
    </div>
  );
}
