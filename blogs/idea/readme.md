## 组件剥离

#### `position` 定位分离

```ts
export const position = (position: string) => (props: any) => {
  props.style = props.style || {};
  props.style.position = position;
};
```

#### `display` 显示分离

```ts
export const display = (display: string) => props => {
  props.style = props.style || {};
  props.style.display = display;
};
```

#### `size` 尺寸大小分离

```ts
export const size = (size: string) => props => {};
```

#### `float`浮动分离

```ts
export const float = float => props => {};
```

#### `theme` 主题皮肤分离

```ts
export const theme = theme => props => {};
```

#### `source` 数据源分离

```ts
export const source = source => props => {};
```
