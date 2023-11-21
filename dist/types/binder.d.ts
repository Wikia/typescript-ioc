import { Binding } from './binding';
import { TypeKey } from './utils';
export declare type Binder<T> = TypeKey<T> | BinderObject<T>;
export declare type BinderObject<T> = ValueBinder<T> | ClassBinder<T> | ProviderBinder<T>;
declare type ValueBinder<T> = {
    bind: TypeKey<T>;
    value: Parameters<Binding<T>['value']>[0];
};
declare type ClassBinder<T> = {
    bind: TypeKey<T>;
    to: Parameters<Binding<T>['to']>[0];
};
declare type ProviderBinder<T> = {
    bind: TypeKey<T>;
    provider: Parameters<Binding<T>['provider']>[0];
};
export declare function applyBinder<T>(binding: Binding<T>, binder: BinderObject<T>): Binding<T>;
export {};
