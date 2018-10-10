export function buildPropObject(prop: any) {
  var arr = [];
  for (var desc in prop) {
    var amt = prop[desc];
    for (var i = 0; i < amt; i++) {
      arr.push(desc);
    }
  }
  return arr;
}
