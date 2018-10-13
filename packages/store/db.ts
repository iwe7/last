export interface DbOptions {
  name: string;
  version: string;
}
export interface DbTableOptions {
  name: string;
  handler: any;
  default: any;
}
import { ActionSubject } from "./store";
// 创建一个数据库
export class Db {
  tables: Map<string, ActionSubject> = new Map();
  main: ActionSubject;
  constructor(private options: DbOptions) {
    this.main = new ActionSubject(options.name);
  }
  of(options: DbTableOptions): Db {
    this.tables.set(
      options.name,
      this.main.of(options.name, options.handler, options.default)
    );
    return this;
  }
  get(name: string): ActionSubject {
    return this.tables.get(name);
  }
}
