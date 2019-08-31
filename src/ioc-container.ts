import { Config, ConfigImpl } from './config';
import { checkType } from './utils';

/**
 * Internal implementation of IoC Container.
 */
export class IoCContainer {
  private static bindings: Map<FunctionConstructor, ConfigImpl> = new Map<FunctionConstructor, ConfigImpl>();

  static isBound(source: Function): boolean {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    const config: ConfigImpl = IoCContainer.bindings.get(baseSource);
    return (!!config);
  }

  static bind(source: Function): Config {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    let config: ConfigImpl = IoCContainer.bindings.get(baseSource);
    if (!config) {
      config = new ConfigImpl(baseSource);
      IoCContainer.bindings.set(baseSource, config);
    }
    return config;
  }

  static get(source: Function) {
    const config: ConfigImpl = IoCContainer.bind(source) as ConfigImpl;
    if (!config.iocprovider) {
      config.to(config.source as FunctionConstructor);
    }
    return config.getInstance();
  }

  static getType(source: Function): Function {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    const config: ConfigImpl = IoCContainer.bindings.get(baseSource);
    if (!config) {
      throw new TypeError(`The type ${source.name} hasn't been registered with the IOC Container`);
    }
    return config.targetSource || config.source;
  }
}
