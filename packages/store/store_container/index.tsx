import { Component, createElement } from "react";
import styles from "./index.scss";
import app from "../store";
import { Subscription } from "rxjs";
export class Store extends Component<any, any> {
  subscription: Subscription[] = [];
  constructor(props: any) {
    super(props);
    app.take().subscribe(children => (this.state = { children }));
    this.subscription.push(
      app.skip().subscribe(children => {
        this.setState({ children });
      })
    );
  }
  componentWillUnmount() {
    this.subscription.map(s => s.unsubscribe());
  }
  render() {
    const { children } = this.state;
    return (
      <div className={styles.store}>
        <div className={styles.store_header} />
        <div className={styles.store_container}>
          <div className={styles.store_col}>
            {children.map((child, index) => (
              <div key={index} className={styles.store_item}>
                {child.name}
              </div>
            ))}
          </div>
          <div className={styles.store_col}>操作</div>
          <div className={styles.store_col}>绑定</div>
          <div className={styles.store_col} />
        </div>
        <div className={styles.store_footer} />
      </div>
    );
  }
}

export default Store;
