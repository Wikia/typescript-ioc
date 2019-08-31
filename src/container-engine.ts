import { BindingImpl } from './binding';
import { checkType } from './utils';

/**
 * Internal implementation of IoC Container.
 */
export class ContainerEngine {
  private bindings: Map<FunctionConstructor, BindingImpl> = new Map<FunctionConstructor, BindingImpl>();

  isBound(source: Function): boolean {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    const config: BindingImpl = this.bindings.get(baseSource);
    return (!!config);
  }

  bind(source: Function): BindingImpl {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    let config: BindingImpl = this.bindings.get(baseSource);
    if (!config) {
      config = new BindingImpl(baseSource, this);
      this.bindings.set(baseSource, config);
    }
    return config;
  }

  get<T extends Function>(source: T): T[keyof T] {
    const config: BindingImpl = this.bind(source);
    if (!config.iocprovider) {
      config.toSelf();
    }
    return config.getInstance();
  }

  getType(source: Function): Function {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    const config: BindingImpl = this.bindings.get(baseSource);
    if (!config) {
      throw new TypeError(`The type ${source.name} hasn't been registered with the IOC Container`);
    }
    return config.getType();
  }
}
