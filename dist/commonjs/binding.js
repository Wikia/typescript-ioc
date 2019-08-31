"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_keys_1 = require("./metadata-keys");
var scope_1 = require("./scope");
var utils_1 = require("./utils");
var BindingImpl = (function () {
    function BindingImpl(source, container) {
        this.source = source;
        this.container = container;
    }
    BindingImpl.prototype.to = function (target) {
        var _this = this;
        utils_1.checkType(target);
        this.targetSource = target;
        if (this.source === this.targetSource) {
            this.iocprovider = {
                get: function () {
                    var params = _this.getParameters();
                    return new (target.bind.apply(target, [void 0].concat(params)))();
                }
            };
        }
        else {
            this.iocprovider = {
                get: function () {
                    return _this.container.getInstance(target);
                }
            };
        }
        if (this.iocscope) {
            this.iocscope.reset(this.source);
        }
        return this;
    };
    BindingImpl.prototype.getParameters = function () {
        var _this = this;
        var paramTypes = this.paramTypes || Reflect.getMetadata(metadata_keys_1.METADATA_KEY.PARAM_TYPES, this.targetSource) || [];
        return paramTypes.map(function (paramType) { return _this.container.getInstance(paramType); });
    };
    BindingImpl.prototype.provider = function (provider) {
        this.iocprovider = provider;
        if (this.iocscope) {
            this.iocscope.reset(this.source);
        }
        return this;
    };
    BindingImpl.prototype.scope = function (scope) {
        this.iocscope = scope;
        if (scope === scope_1.Scope.Singleton) {
            this.source['__block_Instantiation'] = true;
            scope.reset(this.source);
        }
        else if (this.source['__block_Instantiation']) {
            delete this.source['__block_Instantiation'];
        }
        return this;
    };
    BindingImpl.prototype.withParams = function () {
        var paramTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paramTypes[_i] = arguments[_i];
        }
        this.paramTypes = paramTypes;
        return this;
    };
    BindingImpl.prototype.getInstance = function () {
        if (!this.iocscope) {
            this.scope(scope_1.Scope.Singleton);
        }
        if (!this.iocprovider) {
            this.to(this.source);
        }
        return this.iocscope.resolve(this.iocprovider, this.source);
    };
    BindingImpl.prototype.getType = function () {
        return this.targetSource || this.source;
    };
    return BindingImpl;
}());
exports.BindingImpl = BindingImpl;
//# sourceMappingURL=binding.js.map