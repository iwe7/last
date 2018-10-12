import { Component, createElement } from "react";
import styles from "./index.scss";
import * as state from "./state";
import classnames from "classnames";
export class Modal extends Component<state.IModalState, state.IModalState> {
  constructor(props: any) {
    super(props);
    state.set(props);
    state.state.take().subscribe(res => (this.state = res));
    state.state.skip().subscribe(res => this.setState(res));
  }
  render() {
    const { shown } = this.state;
    const className = classnames(styles.modal, shown ? styles.modal_shown : "");
    return (
      <div className={className}>
        <div className={styles.modal_layer} />
        <div className={styles.modal_container}>
          <div className={styles.modal_header}>
            <button>关闭</button>
          </div>
          <div className={styles.modal_content}>
            <div className={styles.forms}>
              <div className={styles.forms_row}>
                <div className={styles.forms_row_left}>
                  <span>宽度</span>
                </div>
                <div className={styles.forms_row_right}>
                  <input type="number" min={0} max={750} />
                </div>
              </div>

              <div className={styles.forms_row}>
                <div className={styles.forms_row_left}>
                  <span>高度</span>
                </div>
                <div className={styles.forms_row_right}>
                  <input type="number" min={0} max={1040} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.modal_footer}>
            <button>取消</button>
            <button>确定</button>
          </div>
        </div>
      </div>
    );
  }
}
