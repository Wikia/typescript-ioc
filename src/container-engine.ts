import { ConfigImpl } from './config';
import { checkType } from './utils';

/**
 * Internal implementation of IoC Container.
 */
export class ContainerEngine {
  private bindings: Map<FunctionConstructor, ConfigImpl> = new Map<FunctionConstructor, ConfigImpl>();

  isBound(source: Function): boolean {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    const config: ConfigImpl = this.bindings.get(baseSource);
    return (!!config);
  }

  bind(source: Function): ConfigImpl {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    let config: ConfigImpl = this.bindings.get(baseSource);
    if (!config) {
      config = new ConfigImpl(baseSource, this);
      this.bindings.set(baseSource, config);
    }
    return config;
  }

  get<T extends Function>(source: T): T[keyof T] {
    const config: ConfigImpl = this.bind(source);
    if (!config.iocprovider) {
      config.toSelf();
    }
    return config.getInstance();
  }

  getType(source: Function): Function {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    const config: ConfigImpl = this.bindings.get(baseSource);
    if (!config) {
      throw new TypeError(`The type ${source.name} hasn't been registered with the IOC Container`);
    }
    return config.getType();
  }
}
