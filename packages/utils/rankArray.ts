export function rankArray<T>(arr: T[]): T[] {
  let itm,
    a = [],
    L = arr.length,
    o = {};
  for (let i = 0; i < L; i++) {
    itm = arr[i];
    if (!itm) continue;
    if (o[itm] == undefined) o[itm] = 1;
    else ++o[itm];
  }
  for (let p in o) a[a.length] = { item: p, frequency: o[p] };
  return a.sort((a, b) => {
    return o[b.item] - o[a.item];
  });
}
