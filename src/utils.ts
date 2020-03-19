/**
 * Utility function to validate type key
 */
export function checkTypeKey<T = any>(input: any): asserts input is TypeKey<T> {
  if (!isTypeKey(input)) {
    throw new TypeError(
      'Invalid type requested to IoC container. TypeKey must be Class, symbol or string.',
    );
  }
}

export function isTypeKey<T = any>(input: any): input is TypeKey<T> {
  const type = typeof input;

  return isType(input) || type === 'symbol' || type === 'string';
}

/**
 * Utility function to validate type
 */
export function checkType<T = any>(input: any): asserts input is Type<T> {
  if (!isType(input)) {
    throw new TypeError('Invalid type requested to IoC container. Type must be Class.');
  }
}

export function isType<T = any>(input: any): input is Type<T> {
  return typeof input === 'function';
}

export interface Type<T> extends Function {
  // tslint:disable-next-line:callable-types
  new (...args: any[]): T;
}

export type TypeKey<T> = Type<T> | Function | symbol | string;

export interface TypeKeyDictionary {
  [index: string]: TypeKey<any>;
}
