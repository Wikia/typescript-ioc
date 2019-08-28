"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkType(source) {
    if (!source) {
        throw new TypeError('Invalid type requested to IoC ' +
            'container. Type is not defined.');
    }
}
exports.checkType = checkType;
//# sourceMappingURL=utils.js.map