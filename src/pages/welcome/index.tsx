import { Component, createElement } from "react";
import styles from "./index.scss";
import { Link } from "react-router-dom";
import { InputNumber } from "../../../packages/ui/input-number";
import app, { ActionSubject, StoreContainer } from "../../../packages/store";
import { map } from "rxjs/operators";
const action = (id: string) =>
  app.of(
    "welcome_" + id,
    (type: string, value: any, old: any) => {
      switch (type) {
        default:
          return { ...old, ...value };
      }
    },
    {
      width: 100,
      height: 100,
      padding: 10,
      border: 10,
      marginTop: 8,
      marginLeft: 8
    }
  );

import { dragMove } from "../../../packages/utils/dragmove";
import { Subscription } from "rxjs";
export class Box extends Component<any, any> {
  id: string;
  subscription: Subscription[] = [];
  action: ActionSubject;
  constructor(props: any) {
    super(props);
    this.id = props.id;
    this.action = action(this.id);
    this.action.take().subscribe(res => (this.state = res));
    this.subscription.push(
      this.action.skip().subscribe(res => {
        this.setState(res);
      })
    );
  }
  componentDidMount() {
    const item: any = this.refs.item;
    this.setRef(item);
  }
  componentWillUnmount() {
    this.subscription.map(s => s.unsubscribe());
  }
  render() {
    const style = {
      width: `${this.state.width}px`,
      height: `${this.state.height}px`,
      padding: `${this.state.padding}px`,
      border: `${this.state.border}px solid red`,
      marginTop: `${this.state.marginTop}px`,
      marginLeft: `${this.state.marginLeft}px`,
      display: `inline-block`
    };
    return <div ref="item" style={style} />;
  }

  setRef(e: Element) {
    if (e) {
      let _start: any;
      dragMove(e)(() => {
        this.action.take().subscribe(res => {
          _start = res;
        });
      })((res: any) => {
        const { move, start } = res;
        this.action.dispatch("updatePosition", {
          marginTop: move.pageY - start.pageY + _start.marginTop,
          marginLeft: move.pageX - start.pageX + _start.marginLeft
        });
      }).subscribe();
    } else {
      return null;
    }
  }

  renderComponent(Component: any, props: any) {
    return <Component {...props} />;
  }
}

// 编辑器
export const editorTime = () => {};
// 调试器
export const debugTime = () => {};
// 运行期
export const runTime = () => {};

export class Welcome extends Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <h2 className="title">项目市场</h2>
          <p className="desc">项目买卖区</p>
          <ul className={styles.list}>
            <li>
              <Link to={"/detail"}>测试项目1</Link>
            </li>
            <li>测试项目2</li>
          </ul>
        </div>
        <div>
          <input className={styles.size_small} type="text" />
          <input type="text" />
          <InputNumber />
          <StoreContainer />
        </div>
        {[1, 1].map((item, index) => (
          <Box key={index} id={index + ""} />
        ))}

        <div className={styles.tabs}>
          <div className={styles.tabs_item}>
            事件
            <div className={styles.tabs_event}>事件1</div>
            <div className={styles.tabs_event}>事件2</div>
            <div className={styles.tabs_event}>事件3</div>
          </div>
          <div className={styles.tabs_item}>
            状态
            <div className={styles.tabs_event}>状态1</div>
            <div className={styles.tabs_event}>状态2</div>
            <div className={styles.tabs_event}>状态3</div>
          </div>
          <div className={styles.tabs_item}>前</div>
          <div className={styles.tabs_item}>中</div>
          <div className={styles.tabs_item}>后</div>
        </div>

        <div className={styles.state}>
          <div className={styles.state_start}>起始状态</div>
        </div>
      </div>
    );
  }
}

export default Welcome;
