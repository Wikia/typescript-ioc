export function assertTypeKey(input) {
    if (!isTypeKey(input)) {
        throw new TypeError('Invalid type requested to IoC container. TypeKey must be Class, symbol or string.');
    }
}
export function isTypeKey(input) {
    var type = typeof input;
    return isType(input) || type === 'symbol' || type === 'string';
}
export function assertType(input) {
    if (!isType(input)) {
        throw new TypeError('Invalid type requested to IoC container. Type must be Class.');
    }
}
export function isType(input) {
    return typeof input === 'function';
}
//# sourceMappingURL=utils.js.map