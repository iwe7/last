```ts
import store from "./store";
store.of(
  "name",
  (type, value, old) => {
    switch (type) {
      default:
        return { ...old, ...value };
    }
  },
  {}
);
store.select("name");
```
