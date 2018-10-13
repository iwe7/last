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
    return class IHoc extends WrappedComponent {
      static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
      end: Subject<void> = new Subject();
      constructor(props: any) {
        super(props);
        store.action.next(props);
        store.action.take().subscribe(res => (this.state = res));
        let sub = store.action.skip().pipe(takeUntil(this.end));
        if (store.key) {
          sub = sub.pipe(
            pluck(store.key),
            distinctUntilChanged()
          );
        }
        sub.subscribe(res => this.setState(res));
      }
      componentDidMount() {
        super.componentDidMount();
      }
      componentWillUnmount() {
        this.end.next();
        super.componentWillUnmount();
      }
      render() {
        return super.render();
      }
    };
  };
}
export default Store;
