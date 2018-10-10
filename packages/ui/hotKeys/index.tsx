import { Component, createElement } from "react";
import { fromEvent, animationFrameScheduler, Subscription } from "rxjs";
import { map, debounceTime, filter, observeOn } from "rxjs/operators";
export interface HotKeysProps {
  keyMap: HotKeysMap;
  component: string | any;
}
export interface HotKeysMap {
  [key: string]: {
    code?: string[];
    handler?: any;
  };
}
export class HotKeys extends Component<HotKeysProps, any> {
  static defaultProps: any = {
    keyMap: {},
    component: "div"
  };
  obser: Subscription;
  componentWillUnmount() {
    this.obser.unsubscribe();
  }
  componentDidMount() {
    const { keyMap } = this.props;
    const element: HTMLElement = this.refs.component as any;
    const keydown = fromEvent(element || document.body, "keydown").pipe(
      map((res: KeyboardEvent) => {
        const code = [];
        if (res.altKey) code.push("alt");
        if (res.shiftKey) code.push("shift");
        if (res.ctrlKey) code.push("ctrl");
        if (res.metaKey) code.push("meta");
        return {
          value: String.fromCharCode(res.keyCode).toLowerCase(),
          code: code
        };
      }),
      filter(res => {
        const isInclude = Object.keys(keyMap).includes(res.value);
        if (isInclude) {
          if (res.code.length === keyMap[res.value].code.length) {
            for (let i = 0; i < res.code.length; i++) {
              if (!keyMap[res.value].code.includes(res.code[i])) {
                return false;
              }
            }
            return true;
          }
        }
        return false;
      })
    );
    this.obser = keydown
      .pipe(
        debounceTime(200),
        observeOn(animationFrameScheduler)
      )
      .subscribe(res => {
        keyMap[res.value].handler();
      });
  }
  render() {
    const { component: Component, children, keyMap, ...props } = this.props;
    return (
      <Component ref="component" {...props}>
        {children}
      </Component>
    );
  }
}
