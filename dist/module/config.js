import { IoCContainer } from './ioc-container';
import { Scope } from './scope';
import { checkType } from './utils';
var ConfigImpl = (function () {
    function ConfigImpl(source) {
        this.source = source;
    }
    ConfigImpl.prototype.to = function (target) {
        checkType(target);
        var targetSource = target;
        this.targetSource = targetSource;
        if (this.source === targetSource) {
            var configImpl_1 = this;
            this.iocprovider = {
                get: function () {
                    var _a;
                    var params = configImpl_1.getParameters();
                    if (configImpl_1.decoratedConstructor) {
                        return (params ? new ((_a = configImpl_1.decoratedConstructor).bind.apply(_a, [void 0].concat(params)))() : new configImpl_1.decoratedConstructor());
                    }
                    return (params ? new (target.bind.apply(target, [void 0].concat(params)))() : new target());
                }
            };
        }
        else {
            this.iocprovider = {
                get: function () {
                    return IoCContainer.get(target);
                }
            };
        }
        if (this.iocscope) {
            this.iocscope.reset(this.source);
        }
        return this;
    };
    ConfigImpl.prototype.provider = function (provider) {
        this.iocprovider = provider;
        if (this.iocscope) {
            this.iocscope.reset(this.source);
        }
        return this;
    };
    ConfigImpl.prototype.scope = function (scope) {
        this.iocscope = scope;
        if (scope === Scope.Singleton) {
            this.source['__block_Instantiation'] = true;
            scope.reset(this.source);
        }
        else if (this.source['__block_Instantiation']) {
            delete this.source['__block_Instantiation'];
        }
        return this;
    };
    ConfigImpl.prototype.withParams = function () {
        var paramTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paramTypes[_i] = arguments[_i];
        }
        this.paramTypes = paramTypes;
        return this;
    };
    ConfigImpl.prototype.toConstructor = function (newConstructor) {
        this.decoratedConstructor = newConstructor;
        return this;
    };
    ConfigImpl.prototype.getInstance = function () {
        if (!this.iocscope) {
            this.scope(Scope.Singleton);
        }
        return this.iocscope.resolve(this.iocprovider, this.source);
    };
    ConfigImpl.prototype.getParameters = function () {
        if (this.paramTypes) {
            return this.paramTypes.map(function (paramType) { return IoCContainer.get(paramType); });
        }
        return null;
    };
    return ConfigImpl;
}());
export { ConfigImpl };
//# sourceMappingURL=config.js.map