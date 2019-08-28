import { Config, ConfigImpl } from './config';
import { checkType } from './utils';

/**
 * Internal implementation of IoC Container.
 */
export class IoCContainer {
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

  static injectProperty(target: Function, key: string, propertyType: Function) {
    const propKey = `__${key}`;
    Object.defineProperty(target.prototype, key, {
      enumerable: true,
      get: function () {
        return this[propKey] ? this[propKey] : this[propKey] = IoCContainer.get(propertyType);
      },
      set: function (newValue) {
        this[propKey] = newValue;
      }
    });
  }

  private static bindings: Map<FunctionConstructor, ConfigImpl> = new Map<FunctionConstructor, ConfigImpl>();
}
