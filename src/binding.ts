import { Container } from './container';
import { METADATA_KEY } from './metadata-keys';
import { Provider } from './provider';
import { BindingScope, SCOPES, ScopesDictionary } from './scope';
import { checkType } from './utils';

/**
 * A bind configuration for a given type in the IoC Container.
 */
export interface Binding {
  /**
   * Inform a given implementation type to be used when a dependency for the source type is requested.
   * @param target The implementation type
   */
  to(target: Object): this;

  /**
   * Inform a value to be used when a dependency for the source type is requested.
   * @param value The instance that should be returned.
   */
  value(value: any): this;

  /**
   * Inform a provider to be used to create instances when a dependency for the source type is requested.
   * @param provider The provider to create instances
   */
  provider(provider: Provider): this;

  /**
   * Inform a scope to handle the instances for objects created by the Container for this binding.
   * @param scope Scope to handle instances
   */
  scope(scope: BindingScope): this;

  /**
   * Inform the types to be retrieved from IoC Container and passed to the type constructor.
   * @param paramTypes A list with parameter types.
   */
  withParams(...paramTypes: any[]): this;
}

export class BindingImpl implements Binding {
  private targetType: FunctionConstructor;
  private _provider: Provider;
  private _scope: BindingScope = SCOPES.Singleton;
  private paramTypes: any[];

  constructor(
    private sourceType: FunctionConstructor,
    private container: Container,
    private scopes: ScopesDictionary,
  ) {
    this.to(this.sourceType);
  }

  to(targetType: FunctionConstructor): this {
    checkType(targetType);
    this.targetType = targetType;
    if (this.sourceType === this.targetType) {
      this.setSelfProvider();
    } else {
      this.setTargetProvider(targetType);
    }
    return this;
  }

  private setSelfProvider(): void {
    this.provider(() => {
      const params = this.getParameters();

      return new this.sourceType(...params);
    });
  }

  private getParameters(): any[] {
    const paramTypes: any[] =
      this.paramTypes || Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, this.targetType) || [];

    return paramTypes.map(paramType => this.container.get(paramType));
  }

  private setTargetProvider(target: FunctionConstructor): void {
    this.provider(() => this.container.get(target));
  }

  value(value: any): this {
    return this.provider(() => value);
  }

  provider(provider: Provider): this {
    this._provider = provider;
    this.scopes[this._scope].reset(this.sourceType);

    return this;
  }

  scope(scope: BindingScope): this {
    this._scope = scope;
    this.scopes[this._scope].reset(this.sourceType);

    return this;
  }

  withParams(...paramTypes: any[]): this {
    this.paramTypes = paramTypes;

    return this;
  }

  getInstance(): any {
    return this.scopes[this._scope].resolve(() => this._provider(this.container), this.sourceType);
  }

  getType(): Function {
    return this.targetType;
  }
}
