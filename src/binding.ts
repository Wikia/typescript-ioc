import { Container } from './container';
import { METADATA_KEY } from './metadata-keys';
import { Provider } from './provider';
import { BindingScope, ScopesDictionary, ScopesEnum } from './scope';
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
  private targetSource: Function;
  private _provider: Provider;
  private _scope: BindingScope;
  private paramTypes: any[];

  constructor(
    private source: Function,
    private container: Container,
    private scopes: ScopesDictionary,
  ) {}

  to(target: FunctionConstructor): this {
    checkType(target);
    this.targetSource = target;
    if (this.source === this.targetSource) {
      this.setSelfProvider(target);
    } else {
      this.setTargetProvider(target);
    }
    return this;
  }

  private setSelfProvider(target: FunctionConstructor): void {
    this.provider(() => {
      const params = this.getParameters();

      return new target(...params);
    });
  }

  private getParameters(): any[] {
    const paramTypes: any[] =
      this.paramTypes || Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, this.targetSource) || [];

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
    if (this._scope) {
      this.scopes[this._scope].reset(this.source);
    }
    return this;
  }

  scope(scope: BindingScope): this {
    this._scope = scope;
    if (this._scope === ScopesEnum.Singleton) {
      (this as any).source['__block_Instantiation'] = true;
      this.scopes[this._scope].reset(this.source);
    } else if ((this as any).source['__block_Instantiation']) {
      delete (this as any).source['__block_Instantiation'];
    }
    return this;
  }

  withParams(...paramTypes: any[]): this {
    this.paramTypes = paramTypes;
    return this;
  }

  getInstance(): any {
    if (!this._scope) {
      this.scope(ScopesEnum.Singleton);
    }
    if (!this._provider) {
      this.to(this.source as FunctionConstructor);
    }

    return this.scopes[this._scope].resolve(() => this._provider(this.container), this.source);
  }

  getType(): Function {
    return this.targetSource || this.source;
  }
}
