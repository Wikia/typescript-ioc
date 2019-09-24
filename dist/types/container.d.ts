import 'reflect-metadata';
import { Binding } from './binding';
export interface ContainerDocumentation {
    bind(source: Function): Binding;
    get<T extends Function>(source: T): T[keyof T];
    getType(source: Function): Function;
}
export declare class Container implements ContainerDocumentation {
    private bindings;
    private isBound;
    private getBinding;
    constructor();
    bind(source: Function): Binding;
    get<T extends Function>(source: T): T[keyof T];
    getType(source: Function): Function;
}
