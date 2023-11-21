import { applyBinder, Binder } from './binder';
import { Binding, BindingImpl } from './binding';
import { BindingScope, SCOPES, ScopesDictionary, SingletonScope, TransientScope } from './scope';
import { assertTypeKey, isType, isTypeKey, Type, TypeKey } from './utils';

export interface ContainerOptions {
  /**
   * @default Singleton
   */
  defaultScope?: BindingScope;

  /**
   * Defines whether classes should be bound autobind by default.
   * @default true
   */
  defaultAutobind?: boolean;
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
      defaultAutobind: true,
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
  bind<T>(binder: Binder<T>): Binding<T> {
    const key = isTypeKey(binder) ? binder : binder?.bind;

    if (this.bindings.has(key)) {
      return this.bindings.get(key);
    }

    if (isType(binder)) {
      return applyBinder(this.ensureBinding(key), { bind: binder, to: binder });
    }

    if (isTypeKey(binder)) {
      return this.ensureBinding(key);
    }

    return applyBinder(this.ensureBinding(key), binder);
  }

  unbind<T>(binder: Binder<T>): void {
    const typeType = isTypeKey(binder) ? binder : binder?.bind;

    this.bindings.delete(typeType);
  }

  /**
   * Retrieve an object from the container. It will resolve all dependencies and apply any type replacement before return the object.
   * If there is no declared dependency to the given source type, an implicit bind is performed to this type.
   */
  get<T>(source: TypeKey<T>): T {
    const binding: BindingImpl<T> = this.ensureBinding(source);

    return binding.getInstance();
  }

  /**
   * Retrieve a type associated with the type provided from the container.
   */
  getType<T>(source: TypeKey<T>): Type<T> {
    const binding: BindingImpl<T> = this.ensureBinding(source);

    return binding.getType();
  }

  private ensureBinding<T>(sourceType: TypeKey<T>): BindingImpl<T> {
    assertTypeKey(sourceType);
    let binding: BindingImpl<T> = this.bindings.get(sourceType);
    if (!binding) {
      binding = new BindingImpl(sourceType as Type<T>, this, this.scopes, this.containerOptions);
      this.bindings.set(sourceType, binding);
    }

    return binding;
  }
}
