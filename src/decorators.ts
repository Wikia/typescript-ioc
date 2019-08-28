import { ConfigImpl } from './config';
import { IoCContainer } from './ioc-container';
import { Provider } from './provider';
import { Scope } from './scope';

/**
 * A decorator to tell the container that this class should be handled by the provided [[Scope]].
 * For example:
 *
 * ```
 * class MyScope extends Scope {
 *   resolve(iocProvider:Provider, source:Function) {
 *     console.log('created by my custom scope.')
 *     return iocProvider.get();
 *   }
 * }
 * @ Scoped(new MyScope())
 * class PersonDAO {
 * }
 * ```
 *
 * Is the same that use:
 *
 * ```
 * Container.bind(PersonDAO).scope(new MyScope());
 * ```
 * @param scope The scope that will handle instantiations for this class.
 */
export function Scoped(scope: Scope) {
  return function (target: Function) {
    IoCContainer.bind(target).scope(scope);
  };
}

/**
 * A decorator to tell the container that this class should instantiated by the given [[Provider]].
 * For example:
 *
 * ```
 * @ Provided({get: () => { return new PersonDAO(); }})
 * class PersonDAO {
 * }
 * ```
 *
 * Is the same that use:
 *
 * ```
 * Container.bind(PersonDAO).provider({get: () => { return new PersonDAO(); }});
 * ```
 * @param provider The provider that will handle instantiations for this class.
 */
export function Provided(provider: Provider) {
  return function (target: Function) {
    IoCContainer.bind(target).provider(provider);
  };
}

/**
 * A decorator to tell the container that this class should be used as the implementation for a given base class.
 * For example:
 *
 * ```
 * class PersonDAO {
 * }
 *
 * @ Provides(PersonDAO)
 * class ProgrammerDAO extends PersonDAO{
 * }
 * ```
 *
 * Is the same that use:
 *
 * ```
 * Container.bind(PersonDAO).to(ProgrammerDAO);
 * ```
 * @param target The base class that will be replaced by this class.
 */
export function Provides(target: Function) {
  return function (to: Function) {
    IoCContainer.bind(target).to(to);
  };
}

/**
 * A decorator to request from Container that it resolve the annotated property dependency.
 * For example:
 *
 * ```
 * class PersonService {
 *    constructor (@ Inject creationTime: Date) {
 *       this.creationTime = creationTime;
 *    }
 *    @ Inject
 *    personDAO: PersonDAO;
 *
 *    creationTime: Date;
 * }
 *
 * ```
 *
 * When you call:
 *
 * ```
 * let personService: PersonService = Container.get(PersonService);
 * // The properties are all defined, retrieved from the IoC Container
 * console.log('PersonService.creationTime: ' + personService.creationTime);
 * console.log('PersonService.personDAO: ' + personService.personDAO);
 * ```
 */
export function Inject(target: any, targetKey: string, index?: number) {
  if (typeof index === 'undefined') {
    return InjectPropertyDecorator.apply(this, [target, targetKey]);
  } else if (typeof index === 'number') {
    return InjectParamDecorator.apply(this, [target, targetKey, index]);
  }

  throw new Error('Invalid @Inject Decorator declaration.');
}

/**
 * Decorator processor for [[Inject]] decorator on properties
 */
function InjectPropertyDecorator(target: Function, targetKey: string) {
  let t = Reflect.getMetadata('design:type', target, targetKey);
  if (!t) {
    // Needed to support react native inheritance
    t = Reflect.getMetadata('design:type', target.constructor, targetKey);
  }
  IoCContainer.injectProperty(target.constructor, targetKey, t);
}

/**
 * Decorator processor for [[Inject]] decorator on constructor parameters
 */
function InjectParamDecorator(target: Function, targetKey: string | symbol, index: number) {
  if (!targetKey) { // only intercept constructor parameters
    const config: ConfigImpl = IoCContainer.bind(target) as ConfigImpl;
    config.paramTypes = config.paramTypes || [];
    const paramTypes: Array<any> = Reflect.getMetadata('design:paramtypes', target);
    config.paramTypes.unshift(paramTypes[index]);
  }
}
