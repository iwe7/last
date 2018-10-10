declare module "*.scss" {
  const value: { [key: string]: any };
  export default value;
}

declare module "*.json" {
  let value: any;
  export default value;
}

declare module "*.svg" {
  let value: any;
  export default value;
}
