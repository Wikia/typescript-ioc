"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_keys_1 = require("./metadata-keys");
function Injectable(options) {
    if (options === void 0) { options = {}; }
    return function (target) {
        if (Reflect.hasOwnMetadata(metadata_keys_1.METADATA_KEY.PARAM_TYPES, target)) {
            throw new Error('Cannot apply @Injectable decorator multiple times.');
        }
        var types = Reflect.getMetadata(metadata_keys_1.METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
        Reflect.defineMetadata(metadata_keys_1.METADATA_KEY.PARAM_TYPES, types, target);
        if (typeof options.autobind === 'boolean') {
            Reflect.defineMetadata(metadata_keys_1.METADATA_KEY.AUTOBIND, options.autobind, target);
        }
        if (typeof options.scope === 'string') {
            Reflect.defineMetadata(metadata_keys_1.METADATA_KEY.SCOPE, options.scope, target);
        }
        return target;
    };
}
exports.Injectable = Injectable;
function Inject(identifier) {
    return function (target, propertyKey, parameterIndex) {
        if (propertyKey || typeof parameterIndex !== 'number') {
            throw new Error('Cannot apply @Inject decorator to a property.');
        }
        var dictionary = Reflect.getMetadata(metadata_keys_1.METADATA_KEY.TAGGED_TYPES, target) || {};
        if (dictionary[parameterIndex.toString()]) {
            throw new Error('Cannot apply @Inject decorator multiple times on the same parameter.');
        }
        dictionary[parameterIndex.toString()] = identifier;
        Reflect.defineMetadata(metadata_keys_1.METADATA_KEY.TAGGED_TYPES, dictionary, target);
        return target;
    };
}
exports.Inject = Inject;
//# sourceMappingURL=decorators.js.map