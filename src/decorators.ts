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
export function Inject(...args: Array<any>) {
  if (args.length < 3 || typeof args[2] === 'undefined') {
    return InjectPropertyDecorator.apply(this, args);
  } else if (args.length === 3 && typeof args[2] === 'number') {
    return InjectParamDecorator.apply(this, args);
  }

  throw new Error('Invalid @Inject Decorator declaration.');
}

/**
 * Decorator processor for [[Inject]] decorator on properties
 */
function InjectPropertyDecorator(target: Function, key: string) {
  let t = Reflect.getMetadata('design:type', target, key);
  if (!t) {
    // Needed to support react native inheritance
    t = Reflect.getMetadata('design:type', target.constructor, key);
  }
  IoCContainer.injectProperty(target.constructor, key, t);
}

/**
 * Decorator processor for [[Inject]] decorator on constructor parameters
 */
function InjectParamDecorator(target: Function, propertyKey: string | symbol, parameterIndex: number) {
  if (!propertyKey) { // only intercept constructor parameters
    const config: ConfigImpl = IoCContainer.bind(target) as ConfigImpl;
    config.paramTypes = config.paramTypes || [];
    const paramTypes: Array<any> = Reflect.getMetadata('design:paramtypes', target);
    config.paramTypes.unshift(paramTypes[parameterIndex]);
  }
}
