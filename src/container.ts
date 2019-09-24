import 'reflect-metadata';
import { Binding, BindingImpl } from './binding';
import { Scope } from './scope';
import { checkType } from './utils';

/**
 * The IoC Container class. Can be used to register and to retrieve your dependencies.
 */
export interface ContainerDocumentation {
  /**
   * Add a dependency to the Container. If this type is already present, just return its associated
   * configuration object.
   * Example of usage:
   *
   * ```
   * Container.bind(PersonDAO).to(ProgrammerDAO).scope(Scope.Singleton);
   * ```
   * @param source The type that will be bound to the Container
   * @return a container configuration
   */
  bind(source: Function): Binding;

  /**
   * Retrieve an object from the container. It will resolve all dependencies and apply any type replacement
   * before return the object.
   * If there is no declared dependency to the given source type, an implicit bind is performed to this type.
   * @param source The dependency type to resolve
   * @return an object resolved for the given source type;
   */
  get<T extends Function>(source: T): T[keyof T];

  /**
   * Retrieve a type associated with the type provided from the container
   * @param source The dependency type to resolve
   * @return an object resolved for the given source type;
   */
  getType(source: Function): Function;
}

export class Container implements ContainerDocumentation {
  private bindings: Map<FunctionConstructor, BindingImpl> = new Map<
    FunctionConstructor,
    BindingImpl
  >();

  constructor() {
    this.bind(Container)
      .scope(Scope.Singleton)
      .value(this);
  }

  bind(source: Function): Binding {
    if (!this.isBound(source)) {
      return this.getBinding(source).to(source as FunctionConstructor);
    }

    return this.getBinding(source);
  }

  private isBound(source: Function): boolean {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    const binding: BindingImpl = this.bindings.get(baseSource);
    return !!binding;
  }

  private getBinding(source: Function): BindingImpl {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    let binding: BindingImpl = this.bindings.get(baseSource);
    if (!binding) {
      binding = new BindingImpl(baseSource, this);
      this.bindings.set(baseSource, binding);
    }
    return binding;
  }

  get<T extends Function>(source: T): T[keyof T] {
    const binding: BindingImpl = this.getBinding(source);

    return binding.getInstance();
  }

  getType(source: Function): Function {
    const binding: BindingImpl = this.getBinding(source);

    return binding.getType();
  }
}
