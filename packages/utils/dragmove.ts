import { takeUntil } from "rxjs/operators";
import { fromEvent, merge, animationFrameScheduler } from "rxjs";
import { switchMap, map, observeOn, tap } from "rxjs/operators";

export function dragMove(ele: Element) {
  const start = mergeElement(touchstart, mousedown)(ele);
  const move = mergeElement(touchmove, mousemove)(document.body);
  const end = mergeElement(touchend, touchcancel, mouseup)(document.body);
  return startHandler => moveHandler => {
    return start.pipe(
      tap(res => startHandler(res)),
      switchMap(_start =>
        move.pipe(
          map(_move => ({
            start: _start,
            move: _move
          })),
          takeUntil(end),
          observeOn(animationFrameScheduler)
        )
      ),
      tap(res => moveHandler(res))
    );
  };
}

export function mergeElement(...arr: any[]) {
  return ele => merge(...arr.map(a => a(ele)));
}

export function touchstart(ele: Element) {
  return fromEvent(ele, "touchstart");
}
export function touchend(ele: Element) {
  return fromEvent(ele, "touchend");
}
export function touchmove(ele: Element) {
  return fromEvent(ele, "touchmove");
}
export function touchcancel(ele: Element) {
  return fromEvent(ele, "touchcancel");
}

export function mousedown(ele: Element) {
  return fromEvent(ele, "mousedown");
}

export function mousemove(ele: Element) {
  return fromEvent(ele, "mousemove");
}

export function mouseup(ele: Element) {
  return fromEvent(ele, "mouseup");
}

export function mouseover(ele: Element) {
  return fromEvent(ele, "mouseover");
}
