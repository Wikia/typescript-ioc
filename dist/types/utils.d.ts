export declare function assertTypeKey<T = any>(input: any): asserts input is TypeKey<T>;
export declare function isTypeKey<T = any>(input: any): input is TypeKey<T>;
export declare function assertType<T = any>(input: any): asserts input is Type<T>;
export declare function isType<T = any>(input: any): input is Type<T>;
export interface Type<T> extends Function {
    new (...args: any[]): T;
}
export declare type TypeKey<T> = Type<T> | Function | symbol | string;
export interface TypeKeyDictionary {
    [index: string]: TypeKey<any>;
}
