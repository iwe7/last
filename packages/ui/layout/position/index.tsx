import { createElement } from "react";
import styles from "./index.scss";
import classnames from "classnames";
export const Relative = props => Component => {
  props["className"] = classnames(props["className"], styles.position_relative);
  return <Component {...props} />;
};

export const Absolute = props => Component => {
  props["className"] = classnames(props["className"], styles.position_absolute);
  return <Component {...props} />;
};

export const Fixed = props => Component => {
  props["className"] = classnames(props["className"], styles.position_fixed);
  return <Component {...props} />;
};

export const Static = props => Component => {
  props["className"] = classnames(props["className"], styles.position_static);
  return <Component {...props} />;
};

export const Inherit = props => Component => {
  props["className"] = classnames(props["className"], styles.position_inherit);
  return <Component {...props} />;
};
