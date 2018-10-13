/**
 * link0
 * next: link1
 * prev: null
 * link1
 * prev: link0
 * next: link2
 * link2
 * prev: link1
 * next: null
 */

export class Link<T = any> {
  constructor(
    public value: T,
    public prev?: Link<any>,
    public next?: Link<any>
  ) {}

  createNext<T = any>(value: T) {
    const next = new Link(value, this, null);
    this.next = next;
    return next;
  }

  createPrev<T = any>(value: T) {
    const prev = new Link(value, null, this);
    this.prev = prev;
    return prev;
  }
  // 添加
  append<T = any>(value: Link<T>) {
    value.prev = this;
    this.next = value;
  }
  // 前面插入
  insert<T = any>(value: Link<T>) {
    value.next = this;
    value.prev = this.prev;
    this.prev.next = value;
  }
  // 后插入
  insertAfter<T = any>(value: Link<T>) {
    value.next = this.next;
    value.prev = value;
    this.prev.next = value;
  }
  // 前插入
  insertBefore<T = any>(value: Link<T>) {
    value.next = this;
    value.prev = this.prev;
    this.prev.next = value;
  }
  // 头部插入
  unshift<T = any>(value: Link<T>) {
    if (this.prev) {
      this.prev.unshift(value);
    } else {
      value.next = this;
    }
  }
}
