import { Container, ContainerOptions } from './container';
import { METADATA_KEY } from './metadata-keys';
import { Provider } from './provider';
import { BindingScope, Scope, ScopesDictionary } from './scope';
import { checkType, Type, TypeKey, TypeKeyDictionary } from './utils';

/**
 * A bind configuration for a given type in the IoC Container.
 */
export interface Binding<T> {
  /**
   * Inform a given implementation type to be used when a dependency for the source type is requested.
   * @param target The implementation type
   */
  to(target: Type<T>): this;

  /**
   * Inform a value to be used when a dependency for the source type is requested.
   * @param value The instance that should be returned.
   */
  value(value: T): this;

  /**
   * Inform a provider to be used to create instances when a dependency for the source type is requested.
   * @param provider The provider to create instances
   */
  provider(provider: Provider<T>): this;

  /**
   * Inform a scope to handle the instances for objects created by the Container for this binding.
   * @param scope Scope to handle instances
   */
  scope(scope: BindingScope): this;

  /**
   * Inform the types to be retrieved from IoC Container and passed to the type constructor.
   * @param paramTypes A list with parameter types.
   */
  withParams(...paramTypes: Type<any>[]): this;
}

export class BindingImpl<T> implements Binding<T> {
  private targetType: Type<T>;
  private _provider: Provider<T>;
  private _scope: Scope<T>;
  private paramTypes: Type<any>[];

  constructor(
    private readonly sourceType: Type<T>,
    private readonly container: Container,
    private readonly scopes: ScopesDictionary,
    private readonly containerOptions: ContainerOptions,
  ) {
    this.scope(this.containerOptions.defaultScope);
    this.to(this.sourceType);
  }

  to(targetType: Type<T>): this {
    checkType(targetType);
    this.targetType = targetType;
    if (this.sourceType === this.targetType) {
      this.provideSourceType();
    } else {
      this.provideTargetType();
    }

    return this;
  }

  private provideSourceType(): void {
    this.provider(() => {
      const params = this.getParameters();

      return new this.sourceType(...params);
    });
  }

  private getParameters(): Type<any>[] {
    let types: TypeKey<any>[] = this.paramTypes;

    if (!types) {
      const metadataTypes: TypeKey<any>[] =
        this.paramTypes || Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, this.targetType) || [];
      const taggedTypesDict: TypeKeyDictionary =
        Reflect.getMetadata(METADATA_KEY.TAGGED_TYPES, this.targetType) || {};

      types = metadataTypes.map((type, index) => taggedTypesDict[index] || type);
    }

    return types.map(paramType => this.container.get(paramType));
  }

  private provideTargetType(): void {
    this.provider(() => this.container.get(this.targetType));
  }

  value(value: T): this {
    return this.provider(() => value);
  }

  provider(provider: Provider<T>): this {
    this._provider = provider;
    this._scope.reset(this.sourceType);

    return this;
  }

  scope(scope: BindingScope): this {
    this._scope = this.scopes[scope];
    this._scope.reset(this.sourceType);

    return this;
  }

  withParams(...paramTypes: Type<any>[]): this {
    this.paramTypes = paramTypes;

    return this;
  }

  getInstance(): T {
    return this._scope.resolve(() => this._provider(this.container), this.sourceType);
  }

  getType(): Type<T> {
    return this.targetType;
  }
}
