import { ContainerImpl } from './container-impl';
import { Provider } from './provider';
import { Scope } from './scope';
export interface Binding {
    to(target: Object): this;
    provider(provider: Provider): this;
    scope(scope: Scope): this;
    withParams(...paramTypes: any[]): this;
}
export declare class BindingImpl implements Binding {
    private source;
    private container;
    private targetSource;
    private iocprovider;
    private iocscope;
    private paramTypes;
    constructor(source: Function, container: ContainerImpl);
    to(target: FunctionConstructor): this;
    private getParameters;
    provider(provider: Provider): this;
    scope(scope: Scope): this;
    withParams(...paramTypes: any[]): this;
    getInstance(): any;
    getType(): Function;
}
