import { Subject } from "rxjs";
import { ActionSubject } from "../../store";
import { takeUntil, pluck, distinctUntilChanged } from "rxjs/operators";
function getDisplayName(component) {
  return component.displayName || component.name || "Component";
}

export interface IStoreAction {
  action: ActionSubject;
  key?: string;
}

export function Store(store: IStoreAction) {
  return (WrappedComponent: any) => {
    class IHoc extends WrappedComponent {
      static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
      end: Subject<void> = new Subject();
      constructor(props: any) {
        super(props);
        store.action.dispatch("", props);
        store.action.take().subscribe(res => (this.state = res));
        let sub = store.action.skip().pipe(takeUntil(this.end));
        if (store.key) {
          sub = sub.pipe(
            pluck(store.key),
            distinctUntilChanged()
          );
        }
        sub.subscribe(res => this.setState(res));
        console.log(this);
      }
      componentWillUnmount() {
        this.end.next();
      }
      render() {
        return super.render();
      }
    }
    return IHoc as any;
  };
}
export default Store;
