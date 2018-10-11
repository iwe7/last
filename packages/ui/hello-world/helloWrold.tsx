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
import { DrawCircle } from "../svgs/drawCircle";
import { SvgIconButton } from '../button/svgIconButton';

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
        <Center>
          <PreviewContainer>
            <HRuler />
            <VRuler />
            <Preview>
              <svg>
                <line x1="0" y1="0" x2="300" y2="300" style={style} />
              </svg>
            </Preview>
          </PreviewContainer>
        </Center>
        <Right />
      </Center>
    </div>
  );
}
