import { Link } from "../src/pages/demo/link";
const link = new Link(1);

test("createNext", () => {
  link.createNext(2);
  expect(link.next.value).toEqual(2);
  expect(link.prev.value).toEqual(1);
});

test("createPrev", () => {
  link.createPrev(0);
  expect(link.prev.value).toEqual(0);
  expect(link.next.value).toEqual(1);
});
