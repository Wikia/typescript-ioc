import { BindingImpl } from './binding';
export declare class ContainerEngine {
    private bindings;
    isBound(source: Function): boolean;
    bind(source: Function): BindingImpl;
    get<T extends Function>(source: T): T[keyof T];
    getType(source: Function): Function;
}