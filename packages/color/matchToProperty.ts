export function matchToProperty(descriptors: any, type: any, baseline?: any) {
  for (let prop in type) {
    if (descriptors instanceof Array) {
      for (let word of descriptors) {
        if (word === prop) {
          return type[prop];
        }
      }
    } else {
      if (descriptors === prop) {
        return type[prop];
      }
    }
  }
  return baseline;
}
