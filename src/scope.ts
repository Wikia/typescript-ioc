// tslint:disable:max-classes-per-file

import { Type } from './utils';

type Creator<T> = () => T;

export type BindingScope = keyof ScopesDictionary;

export interface BindingScopeEnum {
  Singleton: BindingScope;
  Transient: BindingScope;
}

export const SCOPES: BindingScopeEnum = {
  /**
   * Singleton Scope return the same instance for any dependency resolution requested.
   */
  Singleton: 'Singleton',

  /**
   * Transient Scope return a new instance for each dependency resolution requested.
   */
  Transient: 'Transient',
};

export interface ScopesDictionary {
  Singleton: SingletonScope;
  Transient: TransientScope;
}
/**
 * Class responsible to handle the scope of the instances created by the Container
 */
export abstract class Scope<T> {
  /**
   * Method called when the Container needs to resolve a dependency. It should return the instance that will
   * be returned by the Container.
   * @param creator The creator associated with the current bind. Used to create new instances when necessary.
   * @param source The source type of this bind.
   * @return the resolved instance.
   */
  abstract resolve(creator: Creator<T>, source: Type<T>): T;

  /**
   * Called by the IoC Container when some configuration is changed on the Container binding.
   * @param source The source type that has its configuration changed.
   */
  reset(source: Type<T>): void {
    // Do nothing
  }
}

export class TransientScope<T = any> extends Scope<T> {
  resolve(creator: Creator<T>, source: Type<T>): T {
    return creator();
  }
}

export class SingletonScope<T = any> extends Scope<T> {
  private instances = new Map<Type<T>, T>();

  resolve(creator: Creator<T>, source: Type<T>): T {
    let instance: any = this.instances.get(source);
    if (!instance) {
      instance = creator();
      this.instances.set(source, instance);
    }

    return instance;
  }

  reset(source: Type<T>): void {
    this.instances.delete(source);
  }
}
