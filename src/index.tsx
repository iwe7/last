import { render } from "react-dom";
import { HelloWorld } from "../packages/ui/hello-world/helloWrold";
import { createElement } from "react";
import "../themes/index.scss";
render(<HelloWorld />, document.getElementById("app"));
