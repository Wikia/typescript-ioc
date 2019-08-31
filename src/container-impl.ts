import { BindingImpl } from './binding';
import { checkType } from './utils';

/**
 * Internal implementation of IoC Container.
 */
export class ContainerImpl {
  private bindings: Map<FunctionConstructor, BindingImpl> = new Map<FunctionConstructor, BindingImpl>();

  isBound(source: Function): boolean {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    const binding: BindingImpl = this.bindings.get(baseSource);
    return (!!binding);
  }

  bind(source: Function): BindingImpl {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    let binding: BindingImpl = this.bindings.get(baseSource);
    if (!binding) {
      binding = new BindingImpl(baseSource, this);
      this.bindings.set(baseSource, binding);
    }
    return binding;
  }

  getInstance<T extends Function>(source: T): T[keyof T] {
    const binding: BindingImpl = this.bind(source);

    return binding.getInstance();
  }

  getType(source: Function): Function {
    checkType(source);
    const baseSource = source as FunctionConstructor;
    const binding: BindingImpl = this.bindings.get(baseSource);
    if (!binding) {
      throw new TypeError(`The type ${source.name} hasn't been registered with the IOC Container`);
    }
    return binding.getType();
  }
}
