export function rgb(color: string) {
  return [
    parseInt("0x" + color.substring(1, 3)),
    parseInt("0x" + color.substring(3, 5)),
    parseInt("0x" + color.substring(5, 7))
  ];
}
