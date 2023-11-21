import { METADATA_KEY } from './metadata-keys';
export function Injectable(options) {
    if (options === void 0) { options = {}; }
    return function (target) {
        if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
            throw new Error('Cannot apply @Injectable decorator multiple times.');
        }
        var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
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
export function Inject(identifier) {
    return function (target, propertyKey, parameterIndex) {
        if (propertyKey || typeof parameterIndex !== 'number') {
            throw new Error('Cannot apply @Inject decorator to a property.');
        }
        var dictionary = Reflect.getMetadata(METADATA_KEY.TAGGED_TYPES, target) || {};
        if (dictionary[parameterIndex.toString()]) {
            throw new Error('Cannot apply @Inject decorator multiple times on the same parameter.');
        }
        dictionary[parameterIndex.toString()] = identifier;
        Reflect.defineMetadata(METADATA_KEY.TAGGED_TYPES, dictionary, target);
        return target;
    };
}
//# sourceMappingURL=decorators.js.map