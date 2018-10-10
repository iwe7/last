import { Component, createElement } from "react";
import styles from "./index.scss";
export class Ruler extends Component {
  render() {
    return (
      <div>
        {this.ruleV(window.innerHeight, `${styles.ruler} ${styles.v}`)}
        {this.ruleV(window.innerWidth, `${styles.ruler} ${styles.h}`)}
      </div>
    );
  }

  ruleV(total: number, className: string) {
    const spans = [];
    for (let i = 0; i < total; i++) {
      if (i % 50 === 0) {
        spans.push({
          className: styles.milestone,
          label: i
        });
      } else if (i % 5 === 0) {
        spans.push({
          className: styles.major,
          label: i
        });
      } else {
        spans.push({
          label: i
        });
      }
    }
    return (
      <div className={className}>
        {spans.map((item, index) => (
          <span key={index} {...item}>
            {this.renderMilestone(item)}
          </span>
        ))}
      </div>
    );
  }

  renderMilestone(item: any) {
    if (item.className === styles.milestone) {
      return <span className={styles.label}>{item.label}</span>;
    }
  }
}
