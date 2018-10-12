import { BehaviorSubject, animationFrameScheduler } from "rxjs";
import { take, skip, observeOn } from "rxjs/operators";
export interface IStoreHandler<T = any> {
  (type: string, payload: T, current: T): T;
}

export interface IKeyValue {
  [key: string]: any;
}

export abstract class IStoreAction<T = any> implements IKeyValue {
  __handler(type: string, payload: T, current: T) {
    return this[type](payload, current);
  }
}

export const defaultHandler: IStoreHandler = (
  type: string,
  payload: any,
  current: any
) => payload;

export class ActionSubject<T = any> extends BehaviorSubject<T> {
  public children: ActionSubject[] = [];
  public parent: ActionSubject;
  public store: IStoreHandler<T> | IStoreAction<T>;
  constructor(
    public name: string,
    store: IStoreHandler<T> | IStoreAction<T> = defaultHandler,
    defaultVal: T = {} as T,
    parent?: ActionSubject
  ) {
    super(defaultVal);
    this.parent = parent;
    this.store = store;
  }
  dispatch(action: string, value?: T) {
    if (this.store) {
      if (this.store instanceof IStoreAction) {
        const _value = this.store.__handler(action, value, this.value);
        this.next(_value);
      } else {
        const store = this.store(action, value, this.value);
        this.next(store);
      }
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
    store: IStoreHandler<T> | IStoreAction<T> = defaultHandler,
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
      } else {
        select = this.selectParent(selector);
      }
    }
    return select;
  }

  take(num: number = 1) {
    return this.pipe(take(num));
  }

  skip(num: number = 1) {
    return this.pipe(
      skip(num),
      observeOn(animationFrameScheduler)
    );
  }

  protected selectParent(selector: string): ActionSubject {
    if (this.parent) {
      if (this.parent.name === selector) {
        return this.parent;
      } else {
        return this.parent.selectParent(selector);
      }
    }
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
export default appStore;
