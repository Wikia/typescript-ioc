import { IoCContainer } from './ioc-container';
export function Scoped(scope) {
    return function (target) {
        IoCContainer.bind(target).scope(scope);
    };
}
export function Provided(provider) {
    return function (target) {
        IoCContainer.bind(target).provider(provider);
    };
}
export function Inject(target, targetKey, index) {
    if (typeof index === 'undefined') {
        return InjectPropertyDecorator.apply(this, [target, targetKey]);
    }
    else if (typeof index === 'number') {
        return InjectParamDecorator.apply(this, [target, targetKey, index]);
    }
    throw new Error('Invalid @Inject Decorator declaration.');
}
function InjectPropertyDecorator(target, targetKey) {
    var t = Reflect.getMetadata('design:type', target, targetKey);
    if (!t) {
        t = Reflect.getMetadata('design:type', target.constructor, targetKey);
    }
    IoCContainer.injectProperty(target.constructor, targetKey, t);
}
function InjectParamDecorator(target, targetKey, index) {
    if (!targetKey) {
        var config = IoCContainer.bind(target);
        config.paramTypes = config.paramTypes || [];
        var paramTypes = Reflect.getMetadata('design:paramtypes', target);
        config.paramTypes.unshift(paramTypes[index]);
    }
}
//# sourceMappingURL=decorators.js.map