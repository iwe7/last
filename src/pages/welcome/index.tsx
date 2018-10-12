import { Component, createElement } from "react";
import styles from "./index.scss";
import { Link } from "react-router-dom";
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
            <li>测试项目3</li>
            <li>测试项目4</li>
            <li>测试项目5</li>
            <li>测试项目6</li>
            <li>测试项目7</li>
            <li>测试项目8</li>
            <li>测试项目9</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Welcome;
