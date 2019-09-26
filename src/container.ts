import 'reflect-metadata';
import { Binding, BindingImpl } from './binding';
import { BindingScope, SCOPES, ScopesDictionary, SingletonScope, TransientScope } from './scope';
import { checkType, Type } from './utils';

export interface ContainerOptions {
  /**
   * @default Singleton
   */
  defaultScope?: BindingScope;
}

interface ContainerDocumentation {
  /**
   * Add a dependency to the Container. If this type is already present, just return its associated configuration object.
   * @example
   * Container.bind(PersonDAO).to(ProgrammerDAO).scope(SCOPES.Singleton);
   */
  bind<T>(source: Type<T>): Binding<T>;

  /**
   * Retrieve an object from the container. It will resolve all dependencies and apply any type replacement before return the object.
   * If there is no declared dependency to the given source type, an implicit bind is performed to this type.
   */
  get<T>(source: Type<T>): T;

  /**
   * Retrieve a type associated with the type provided from the container.
   */
  getType<T>(source: Type<T>): Type<T>;
}

/**
 * The IoC Container class. Can be used to register and to retrieve your dependencies.
 */
export class Container implements ContainerDocumentation {
  private readonly containerOptions: ContainerOptions;

  private readonly bindings = new Map<Type<any>, BindingImpl<any>>();

  private readonly scopes: ScopesDictionary = {
    Singleton: new SingletonScope(),
    Transient: new TransientScope(),
  };

  constructor(containerOptions: ContainerOptions = {}) {
    this.containerOptions = {
      defaultScope: SCOPES.Singleton,
      ...containerOptions,
    };

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
      binding = new BindingImpl(sourceType, this, this.scopes, this.containerOptions);
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
