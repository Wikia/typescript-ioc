import { DESIGN_PARAM_TYPES, PARAM_TYPES } from './metadata-keys';

export function Injectable() {
  return function(target: any) {

    if (Reflect.hasOwnMetadata(PARAM_TYPES, target)) {
      throw new Error('Already defined');
    }

    const types = Reflect.getMetadata(DESIGN_PARAM_TYPES, target) || [];
    Reflect.defineMetadata(PARAM_TYPES, types, target);

    return target;
  };
}
