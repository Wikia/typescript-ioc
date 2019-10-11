import 'reflect-metadata';
import { Binding, BindingImpl } from './binding';
import { BindingScope, SCOPES, ScopesDictionary, SingletonScope, TransientScope } from './scope';
import { checkType, Type, TypeKey } from './utils';

export interface ContainerOptions {
  /**
   * @default Singleton
   */
  defaultScope?: BindingScope;
}

/**
 * The IoC Container class. Can be used to register and to retrieve your dependencies.
 */
export class Container {
  private readonly containerOptions: ContainerOptions;

  private readonly bindings = new Map<TypeKey<any>, BindingImpl<any>>();

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

  /**
   * Add a dependency to the Container. If this type is already present, just return its associated configuration object.
   * @example
   * Container.bind(PersonDAO).to(ProgrammerDAO).scope(SCOPES.Singleton);
   */
  bind<T>(source: TypeKey<T>): Binding<T> {
    if (!this.isBound(source)) {
      return this.getBinding(source).to(source as Type<T>);
    }

    return this.getBinding(source);
  }

  private isBound<T>(sourceType: TypeKey<T>): boolean {
    checkType(sourceType);
    const binding: BindingImpl<T> = this.bindings.get(sourceType);

    return !!binding;
  }

  private getBinding<T>(sourceType: TypeKey<T>): BindingImpl<T> {
    checkType(sourceType);
    let binding: BindingImpl<T> = this.bindings.get(sourceType);
    if (!binding) {
      binding = new BindingImpl(sourceType as Type<T>, this, this.scopes, this.containerOptions);
      this.bindings.set(sourceType, binding);
    }

    return binding;
  }

  /**
   * Retrieve an object from the container. It will resolve all dependencies and apply any type replacement before return the object.
   * If there is no declared dependency to the given source type, an implicit bind is performed to this type.
   */
  get<T>(source: TypeKey<T>): T {
    const binding: BindingImpl<T> = this.getBinding(source);

    return binding.getInstance();
  }

  /**
   * Retrieve a type associated with the type provided from the container.
   */
  getType<T>(source: TypeKey<T>): Type<T> {
    const binding: BindingImpl<T> = this.getBinding(source);

    return binding.getType();
  }
}
