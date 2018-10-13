import { render } from "react-dom";
import { HelloWorld } from "../packages/ui/hello-world/helloWrold";
import { createElement } from "react";

import "../themes/index.scss";

import Wxapp from "./pages/wxapp";
import Welcome from "./pages/welcome";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { compose } from "ramda";


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/wxapp" component={Wxapp} />
      <Route path="/hello" component={HelloWorld} />
    </Switch>
  </BrowserRouter>
);

render(<App />, document.getElementById("app"));
