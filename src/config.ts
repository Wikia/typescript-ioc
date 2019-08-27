import { IoCContainer } from './ioc-container';
import { Provider } from './provider';
import { Scope } from './scope';
import { checkType } from './utils';

/**
 * A bind configuration for a given type in the IoC Container.
 */
export interface Config {
  /**
   * Inform a given implementation type to be used when a dependency for the source type is requested.
   * @param target The implementation type
   */
  to(target: Object): Config;

  /**
   * Inform a provider to be used to create instances when a dependency for the source type is requested.
   * @param provider The provider to create instances
   */
  provider(provider: Provider): Config;

  /**
   * Inform a scope to handle the instances for objects created by the Container for this binding.
   * @param scope Scope to handle instances
   */
  scope(scope: Scope): Config;

  /**
   * Inform the types to be retrieved from IoC Container and passed to the type constructor.
   * @param paramTypes A list with parameter types.
   */
  withParams(...paramTypes: Array<any>): Config;
}

export class ConfigImpl implements Config {
  public source: Function;
  public targetSource: Function;
  public iocprovider: Provider;
  public iocscope: Scope;
  public decoratedConstructor: FunctionConstructor;
  public paramTypes: Array<any>;

  constructor(source: Function) {
    this.source = source;
  }

  public to(target: FunctionConstructor) {
    checkType(target);
    const targetSource = target as FunctionConstructor;
    this.targetSource = targetSource;
    if (this.source === targetSource) {
      const configImpl = this;
      this.iocprovider = {
        get: () => {
          const params = configImpl.getParameters();
          if (configImpl.decoratedConstructor) {
            return (params ? new configImpl.decoratedConstructor(...params) : new configImpl.decoratedConstructor());
          }
          return (params ? new target(...params) : new target());
        }
      };
    } else {
      this.iocprovider = {
        get: () => {
          return IoCContainer.get(target);
        }
      };
    }
    if (this.iocscope) {
      this.iocscope.reset(this.source);
    }
    return this;
  }

  public provider(provider: Provider) {
    this.iocprovider = provider;
    if (this.iocscope) {
      this.iocscope.reset(this.source);
    }
    return this;
  }

  public scope(scope: Scope) {
    this.iocscope = scope;
    if (scope === Scope.Singleton) {
      (this as any).source['__block_Instantiation'] = true;
      scope.reset(this.source);
    } else if ((this as any).source['__block_Instantiation']) {
      delete (this as any).source['__block_Instantiation'];
    }
    return this;
  }

  public withParams(...paramTypes: Array<any>) {
    this.paramTypes = paramTypes;
    return this;
  }

  public toConstructor(newConstructor: FunctionConstructor) {
    this.decoratedConstructor = newConstructor;
    return this;
  }

  public getInstance() {
    if (!this.iocscope) {
      this.scope(Scope.Singleton);
    }
    return this.iocscope.resolve(this.iocprovider, this.source);
  }

  private getParameters() {
    if (this.paramTypes) {
      return this.paramTypes.map(paramType => IoCContainer.get(paramType));
    }
    return null;
  }
}
