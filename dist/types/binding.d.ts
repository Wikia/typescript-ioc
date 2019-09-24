import { Container } from './container';
import { Provider } from './provider';
import { Scope } from './scope';
export interface Binding {
    to(target: Object): this;
    value(value: any): this;
    provider(provider: Provider): this;
    scope(scope: Scope): this;
    withParams(...paramTypes: any[]): this;
}
export declare class BindingImpl implements Binding {
    private source;
    private container;
    private targetSource;
    private _provider;
    private _scope;
    private paramTypes;
    private setSelfProvider;
    private getParameters;
    private setTargetProvider;
    constructor(source: Function, container: Container);
    to(target: FunctionConstructor): this;
    value(value: any): this;
    provider(provider: Provider): this;
    scope(scope: Scope): this;
    withParams(...paramTypes: any[]): this;
    getInstance(): any;
    getType(): Function;
}
