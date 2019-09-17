import { ContainerImpl } from './container-impl';
import { Scope } from './scope';
export interface Binding {
    to(target: Object): this;
    value(value: any): this;
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
    private getParameters;
    private provider;
    constructor(source: Function, container: ContainerImpl);
    to(target: FunctionConstructor): this;
    value(value: any): this;
    scope(scope: Scope): this;
    withParams(...paramTypes: any[]): this;
    getInstance(): any;
    getType(): Function;
}
