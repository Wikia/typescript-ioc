import { Container, ContainerOptions } from './container';
import { Provider } from './provider';
import { BindingScope, ScopesDictionary } from './scope';
import { Type, TypeKey } from './utils';
export interface Binding<T> {
    to(target: Type<T>): this;
    value(value: T): this;
    provider(provider: Provider<T>): this;
    scope(scope: BindingScope): this;
    withParams(...paramTypes: TypeKey<any>[]): this;
}
export declare class BindingImpl<T> implements Binding<T> {
    private readonly sourceType;
    private readonly container;
    private readonly scopes;
    private targetType;
    private _provider;
    private _scope;
    private paramTypes;
    constructor(sourceType: TypeKey<T>, container: Container, scopes: ScopesDictionary, options: ContainerOptions);
    to(targetType: Type<T>): this;
    private getMetadataParamTypes;
    private provideSourceType;
    private getParameters;
    private provideTargetType;
    value(value: T): this;
    provider(provider: Provider<T>): this;
    scope(scope: BindingScope): this;
    withParams(...paramTypes: TypeKey<any>[]): this;
    getInstance(): T;
    getType(): Type<T>;
}
