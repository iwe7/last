import { createElement } from "react";
import styles from "./index.scss";
import { HRuler } from "../ruler/hRuler";
import { VRuler } from "../ruler/vRuler";

import { Toolbar } from "../toolbar/toolbar";
import { Preview } from "../preview/preview";
import { Quick } from "../quick/quick";
import { Left } from "../left/left";
import { Right } from "../right/right";
import { Center } from "../center/center";
import { PreviewContainer } from "../preview/previewContainer";
import { HLine } from "../ruler/hLine";
import { VLine } from "../ruler/vLine";
import { ToolTip } from "../tooltip/tooltip";
import { Footer } from '../footer/footer';

export function HelloWorld() {
  const style = {
    stroke: `rgb(99,99,99)`,
    strokeWidth: 2
  };
  return (
    <div className={styles.helloWorld}>
      <Toolbar />
      <Center>
        <Left />
        <Quick />
        <ToolTip tip={"tip"} />
        <Center relative={true}>
          <HLine />
          <PreviewContainer>
            <HRuler />
            <VRuler />
            <Preview />
          </PreviewContainer>
        </Center>
        <Right />
      </Center>
      <Footer />
    </div>
  );
}
