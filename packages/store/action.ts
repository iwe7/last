import { BehaviorSubject } from "rxjs";
import { scan } from "rxjs/operators";
export interface IStoreHandler<T = any> {
  (type: string, payload: T, current: T): T;
}
export const defaultHandler: IStoreHandler = (
  type: string,
  payload: any,
  current: any
) => payload;

export class ActionSubject<T = any> extends BehaviorSubject<T> {
  public children: ActionSubject[] = [];
  public parent: ActionSubject;
  public store: IStoreHandler<T>;
  constructor(
    public name: string,
    store: IStoreHandler<T> = defaultHandler,
    defaultVal: T = {} as T,
    parent?: ActionSubject
  ) {
    super(defaultVal);
    this.parent = parent;
    this.store = store;
  }

  dispatch(action: string, value?: T) {
    if (this.store) {
      const store = this.store(action, value, this.value);
      this.next(store);
    } else {
      console.log(`no action ${action}`);
    }
    return this;
  }

  /**
   * 新建
   * @param name 名字
   * @param store 操作
   */
  of<T = any>(
    name: string,
    store: IStoreHandler<T> = defaultHandler,
    defaultVal: T = {} as T
  ): ActionSubject {
    const child = new ActionSubject(name, store, defaultVal, this);
    this.children = [...this.children, child];
    return child;
  }
  /**
   * 选择
   * @param selector 名字
   */
  select(selector?: string): ActionSubject {
    let select: ActionSubject;
    if (selector === this.name) {
      select = this;
    } else {
      select = this.children.find(res => {
        return res.name === selector;
      });
      if (!select) {
        select = this.selectChildren(selector);
      }
    }
    return select;
  }

  private selectChildren(selector: string) {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      const select = child.select(selector);
      if (select) {
        return select;
      }
    }
  }
}
export const appStore = new ActionSubject("__main__");
