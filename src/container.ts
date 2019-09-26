import 'reflect-metadata';
import { Binding, BindingImpl } from './binding';
import { SCOPES, ScopesDictionary, SingletonScope, TransientScope } from './scope';
import { checkType, Type } from './utils';

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
  bind<T>(source: Type<T>): Binding<T>;

  /**
   * Retrieve an object from the container. It will resolve all dependencies and apply any type replacement
   * before return the object.
   * If there is no declared dependency to the given source type, an implicit bind is performed to this type.
   * @param source The dependency type to resolve
   * @return an object resolved for the given source type;
   */
  get<T>(source: Type<T>): T;

  /**
   * Retrieve a type associated with the type provided from the container
   * @param source The dependency type to resolve
   * @return an object resolved for the given source type;
   */
  getType<T>(source: Type<T>): Type<T>;
}

export class Container implements ContainerDocumentation {
  private bindings = new Map<Type<any>, BindingImpl<any>>();

  private scopes: ScopesDictionary = {
    Singleton: new SingletonScope(),
    Transient: new TransientScope(),
  };

  constructor() {
    this.bind(Container)
      .scope(SCOPES.Singleton)
      .value(this);
  }

  bind<T>(source: Type<T>): Binding<T> {
    if (!this.isBound(source)) {
      return this.getBinding(source).to(source);
    }

    return this.getBinding(source);
  }

  private isBound<T>(sourceType: Type<T>): boolean {
    checkType(sourceType);
    const binding: BindingImpl<T> = this.bindings.get(sourceType);

    return !!binding;
  }

  private getBinding<T>(sourceType: Type<T>): BindingImpl<T> {
    checkType(sourceType);
    let binding: BindingImpl<T> = this.bindings.get(sourceType);
    if (!binding) {
      binding = new BindingImpl(sourceType, this, this.scopes);
      this.bindings.set(sourceType, binding);
    }

    return binding;
  }

  get<T>(source: Type<T>): T {
    const binding: BindingImpl<T> = this.getBinding(source);

    return binding.getInstance();
  }

  getType<T>(source: Type<T>): Type<T> {
    const binding: BindingImpl<T> = this.getBinding(source);

    return binding.getType();
  }
}
