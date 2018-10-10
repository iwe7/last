import { render } from "react-dom";
import { HelloWorld } from "../packages/ui/hello-world/helloWrold";
import { createElement } from "react";
import * as color from "../packages/color/index";
console.log(color);
import "../themes/index.scss";
import auto from "../packages/ui/flex";
auto(100, 1);
render(<HelloWorld />, document.getElementById("app"));
