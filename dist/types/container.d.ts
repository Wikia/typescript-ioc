import { Binder } from './binder';
import { Binding } from './binding';
import { BindingScope } from './scope';
import { Type, TypeKey } from './utils';
export interface ContainerOptions {
    defaultScope?: BindingScope;
    defaultAutobind?: boolean;
}
export declare class Container {
    private readonly containerOptions;
    private readonly bindings;
    private readonly scopes;
    constructor(containerOptions?: ContainerOptions);
    bind<T>(binder: Binder<T>): Binding<T>;
    unbind<T>(binder: Binder<T>): void;
    get<T>(source: TypeKey<T>): T;
    getType<T>(source: TypeKey<T>): Type<T>;
    private ensureBinding;
}
