"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function assertTypeKey(input) {
    if (!isTypeKey(input)) {
        throw new TypeError('Invalid type requested to IoC container. TypeKey must be Class, symbol or string.');
    }
}
exports.assertTypeKey = assertTypeKey;
function isTypeKey(input) {
    var type = typeof input;
    return isType(input) || type === 'symbol' || type === 'string';
}
exports.isTypeKey = isTypeKey;
function assertType(input) {
    if (!isType(input)) {
        throw new TypeError('Invalid type requested to IoC container. Type must be Class.');
    }
}
exports.assertType = assertType;
function isType(input) {
    return typeof input === 'function';
}
exports.isType = isType;
//# sourceMappingURL=utils.js.map