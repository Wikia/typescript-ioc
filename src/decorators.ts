import { METADATA_KEY } from './metadata-keys';
import { BindingScope } from './scope';
import { TypeKey, TypeKeyDictionary } from './utils';

export interface InjectableOptions {
  autobind?: boolean;
  scope?: BindingScope;
}

export function Injectable(options: InjectableOptions = {}): Function {
  // tslint:disable-next-line:only-arrow-functions
  return function<T>(target: T): T {
    if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
      throw new Error('Cannot apply @Injectable decorator multiple times.');
    }

    const types: TypeKey<any>[] =
      Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];

    Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);

    if (typeof options.autobind === 'boolean') {
      Reflect.defineMetadata(METADATA_KEY.AUTOBIND, options.autobind, target);
    }
    if (typeof options.scope === 'string') {
      Reflect.defineMetadata(METADATA_KEY.SCOPE, options.scope, target);
    }

    return target;
  };
}

export function Inject<T extends Function>(identifier: TypeKey<T>): Function {
  // tslint:disable-next-line:only-arrow-functions
  return function(target: T, propertyKey: string | symbol, parameterIndex: number): T {
    if (propertyKey || typeof parameterIndex !== 'number') {
      throw new Error('Cannot apply @Inject decorator to a property.');
    }

    const dictionary: TypeKeyDictionary =
      Reflect.getMetadata(METADATA_KEY.TAGGED_TYPES, target) || {};

    if (dictionary[parameterIndex.toString()]) {
      throw new Error('Cannot apply @Inject decorator multiple times on the same parameter.');
    }

    dictionary[parameterIndex.toString()] = identifier;
    Reflect.defineMetadata(METADATA_KEY.TAGGED_TYPES, dictionary, target);

    return target;
  };
}
