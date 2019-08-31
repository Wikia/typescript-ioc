import { METADATA_KEY } from './metadata-keys';
import { Scope } from './scope';
import { checkType } from './utils';
var ConfigImpl = (function () {
    function ConfigImpl(source, engine) {
        this.source = source;
        this.engine = engine;
    }
    ConfigImpl.prototype.toSelf = function () {
        return this.to(this.source);
    };
    ConfigImpl.prototype.to = function (target) {
        var _this = this;
        checkType(target);
        this.targetSource = target;
        if (this.source === this.targetSource) {
            var configImpl_1 = this;
            this.iocprovider = {
                get: function () {
                    var params = configImpl_1.getParameters();
                    return new (target.bind.apply(target, [void 0].concat(params)))();
                }
            };
        }
        else {
            this.iocprovider = {
                get: function () {
                    return _this.engine.get(target);
                }
            };
        }
        if (this.iocscope) {
            this.iocscope.reset(this.source);
        }
        return this;
    };
    ConfigImpl.prototype.getParameters = function () {
        var _this = this;
        var paramTypes = this.paramTypes || Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, this.targetSource) || [];
        return paramTypes.map(function (paramType) { return _this.engine.get(paramType); });
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
    ConfigImpl.prototype.getInstance = function () {
        if (!this.iocscope) {
            this.scope(Scope.Singleton);
        }
        return this.iocscope.resolve(this.iocprovider, this.source);
    };
    ConfigImpl.prototype.getType = function () {
        return this.targetSource || this.source;
    };
    return ConfigImpl;
}());
export { ConfigImpl };
//# sourceMappingURL=config.js.map