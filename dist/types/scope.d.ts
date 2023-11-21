import { Type, TypeKey } from './utils';
declare type Creator<T> = () => T;
export declare type BindingScope = keyof ScopesDictionary;
export interface BindingScopeEnum {
    Singleton: BindingScope;
    Transient: BindingScope;
}
export declare const SCOPES: BindingScopeEnum;
export interface ScopesDictionary {
    Singleton: SingletonScope;
    Transient: TransientScope;
}
export declare abstract class Scope<T> {
    abstract resolve(creator: Creator<T>, source: TypeKey<T>): T;
    reset(source: TypeKey<T>): void;
}
export declare class TransientScope<T = any> extends Scope<T> {
    resolve(creator: Creator<T>, source: Type<T>): T;
}
export declare class SingletonScope<T = any> extends Scope<T> {
    private instances;
    resolve(creator: Creator<T>, source: TypeKey<T>): T;
    reset(source: TypeKey<T>): void;
}
export {};
