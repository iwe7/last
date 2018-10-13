// 状态【组件】
import { LinkedList, LinkedNode } from "../../../packages/structures";
export const State = new LinkedList();
const state = {
  value: 1,
  name: "testState",
  title: "初始状态"
};
State.append(state);
State.append({ ...state, value: 2 });
State.append({ ...state, value: 3 });
State.append({ ...state, value: 4 });
State.append({ ...state, value: 5 });
const arrs = State.toArray();
arrs.map(arr => console.log(arr.value));

const event = [];

const func = [
  {
    name: "",
    event: "onClick",
    component: "id",
    handler: state => state
  }
];
const component = [
  {
    id: "",
    onClick: () => {}
  }
];
