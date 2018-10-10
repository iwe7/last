import { containsValidTerms } from "./const";
import { translateQueryString, IBaseline } from "./translateQueryString";
export interface IQuery extends IBaseline {
  exactMatch?: any;
  namedColor?: string;
}
export function isIQuery(query: any): query is IQuery {
  if (query.exactMatch || query.namedColor) {
    return true;
  } else {
    return false;
  }
}
export function handleQuery(query: any): IBaseline | IQuery | boolean {
  if (query) {
    if (isIQuery(query)) {
      return query;
    } else if (containsValidTerms(query)) {
      return translateQueryString(query);
    } else {
      return false;
    }
  } else {
    return false;
  }
}
