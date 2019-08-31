import 'reflect-metadata';
import { Binding } from './binding';
export declare class Container {
    private container;
    bind(source: Function): Binding;
    get<T extends Function>(source: T): T[keyof T];
    getType(source: Function): Function;
}
