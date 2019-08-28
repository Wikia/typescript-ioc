"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ioc_container_1 = require("./ioc-container");
function Scoped(scope) {
    return function (target) {
        ioc_container_1.IoCContainer.bind(target).scope(scope);
    };
}
exports.Scoped = Scoped;
function Provided(provider) {
    return function (target) {
        ioc_container_1.IoCContainer.bind(target).provider(provider);
    };
}
exports.Provided = Provided;
function Provides(target) {
    return function (to) {
        ioc_container_1.IoCContainer.bind(target).to(to);
    };
}
exports.Provides = Provides;
function Inject(target, targetKey, index) {
    if (typeof index === 'undefined') {
        return InjectPropertyDecorator.apply(this, [target, targetKey]);
    }
    else if (typeof index === 'number') {
        return InjectParamDecorator.apply(this, [target, targetKey, index]);
    }
    throw new Error('Invalid @Inject Decorator declaration.');
}
exports.Inject = Inject;
function InjectPropertyDecorator(target, targetKey) {
    var t = Reflect.getMetadata('design:type', target, targetKey);
    if (!t) {
        t = Reflect.getMetadata('design:type', target.constructor, targetKey);
    }
    ioc_container_1.IoCContainer.injectProperty(target.constructor, targetKey, t);
}
function InjectParamDecorator(target, targetKey, index) {
    if (!targetKey) {
        var config = ioc_container_1.IoCContainer.bind(target);
        config.paramTypes = config.paramTypes || [];
        var paramTypes = Reflect.getMetadata('design:paramtypes', target);
        config.paramTypes.unshift(paramTypes[index]);
    }
}
//# sourceMappingURL=decorators.js.map