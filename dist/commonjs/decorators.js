"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_keys_1 = require("./metadata-keys");
function Injectable() {
    return function (target) {
        if (Reflect.hasOwnMetadata(metadata_keys_1.METADATA_KEY.PARAM_TYPES, target)) {
            throw new Error('Cannot apply @Injectable decorator multiple times.');
        }
        var types = Reflect.getMetadata(metadata_keys_1.METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
        Reflect.defineMetadata(metadata_keys_1.METADATA_KEY.PARAM_TYPES, types, target);
        return target;
    };
}
exports.Injectable = Injectable;
//# sourceMappingURL=decorators.js.map