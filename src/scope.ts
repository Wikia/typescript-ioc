// tslint:disable:max-classes-per-file

type Creator<T = any> = () => T;

export type BindingScope = keyof ScopesDictionary;

export interface BindingScopeEnum {
  Singleton: BindingScope;
  Transient: BindingScope;
}

// tslint:disable-next-line:variable-name
export const ScopesEnum: BindingScopeEnum = {
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
export abstract class Scope {
  /**
   * Method called when the Container needs to resolve a dependency. It should return the instance that will
   * be returned by the Container.
   * @param creator The creator associated with the current bind. Used to create new instances when necessary.
   * @param source The source type of this bind.
   * @return the resolved instance.
   */
  abstract resolve(creator: Creator, source: Function): any;

  /**
   * Called by the IoC Container when some configuration is changed on the Container binding.
   * @param source The source type that has its configuration changed.
   */
  reset(source: Function): void {
    // Do nothing
  }
}

/**
 * Default [[Scope]] that always create a new instance for any dependency resolution request
 */
export class TransientScope extends Scope {
  resolve(creator: Creator, source: Function): any {
    return creator();
  }
}

/**
 * Scope that create only a single instance to handle all dependency resolution requests.
 */
export class SingletonScope extends Scope {
  private static instances: Map<Function, any> = new Map<Function, any>();

  resolve(creator: Creator, source: Function): any {
    let instance: any = SingletonScope.instances.get(source);
    if (!instance) {
      (source as any)['__block_Instantiation'] = false;
      instance = creator();
      (source as any)['__block_Instantiation'] = true;
      SingletonScope.instances.set(source, instance);
    }
    return instance;
  }

  reset(source: Function): void {
    SingletonScope.instances.delete(source);
  }
}
