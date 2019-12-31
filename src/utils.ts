/**
 * Utility function to validate type
 */
export function checkType(source: Object): void {
  if (!source) {
    throw new TypeError('Invalid type requested to IoC container. Type is not defined.');
  }
}

export interface Type<T> extends Function {
  // tslint:disable-next-line:callable-types
  new (...args: any[]): T;
}

export type TypeKey<T> = Type<T> | Function | symbol | string;

export interface TypeKeyDictionary {
  [index: string]: TypeKey<any>;
}
