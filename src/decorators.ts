import { METADATA_KEY } from './metadata-keys';

export function Injectable(): Function {
  // tslint:disable-next-line:only-arrow-functions
  return function<T>(target: T): T {
    if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
      throw new Error('Cannot apply @Injectable decorator multiple times.');
    }

    const types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
    Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);

    return target;
  };
}
