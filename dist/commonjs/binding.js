"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var metadata_keys_1 = require("./metadata-keys");
var utils_1 = require("./utils");
var BindingImpl = (function () {
    function BindingImpl(sourceType, container, scopes, options) {
        var _a, _b;
        this.sourceType = sourceType;
        this.container = container;
        this.scopes = scopes;
        this.paramTypes = [];
        if (!utils_1.isType(this.sourceType)) {
            return this.scope(options.defaultScope);
        }
        this.scope((_a = Reflect.getMetadata(metadata_keys_1.METADATA_KEY.SCOPE, this.sourceType)) !== null && _a !== void 0 ? _a : options.defaultScope);
        if ((_b = Reflect.getMetadata(metadata_keys_1.METADATA_KEY.AUTOBIND, this.sourceType)) !== null && _b !== void 0 ? _b : options.defaultAutobind) {
            this.to(this.sourceType);
        }
    }
    BindingImpl.prototype.to = function (targetType) {
        utils_1.assertType(targetType);
        this.targetType = targetType;
        this.paramTypes = this.getMetadataParamTypes();
        if (this.sourceType === this.targetType) {
            this.provideSourceType(targetType);
        }
        else {
            this.provideTargetType(targetType);
        }
        return this;
    };
    BindingImpl.prototype.getMetadataParamTypes = function () {
        var metadataTypes = Reflect.getMetadata(metadata_keys_1.METADATA_KEY.PARAM_TYPES, this.targetType) || [];
        var taggedTypesDict = Reflect.getMetadata(metadata_keys_1.METADATA_KEY.TAGGED_TYPES, this.targetType) || {};
        return metadataTypes.map(function (type, index) { return taggedTypesDict[index] || type; });
    };
    BindingImpl.prototype.provideSourceType = function (type) {
        var _this = this;
        this.provider(function () {
            var params = _this.getParameters();
            return new (type.bind.apply(type, __spreadArrays([void 0], params)))();
        });
    };
    BindingImpl.prototype.getParameters = function () {
        var _this = this;
        return this.paramTypes.map(function (paramType) { return _this.container.get(paramType); });
    };
    BindingImpl.prototype.provideTargetType = function (type) {
        var _this = this;
        this.provider(function () { return _this.container.get(type); });
    };
    BindingImpl.prototype.value = function (value) {
        return this.provider(function () { return value; });
    };
    BindingImpl.prototype.provider = function (provider) {
        this._provider = provider;
        this._scope.reset(this.sourceType);
        return this;
    };
    BindingImpl.prototype.scope = function (scope) {
        this._scope = this.scopes[scope];
        this._scope.reset(this.sourceType);
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
        var _this = this;
        if (!this._provider) {
            throw new Error(this.sourceType.toString() + " is not bound to anything.");
        }
        return this._scope.resolve(function () { return _this._provider(_this.container); }, this.sourceType);
    };
    BindingImpl.prototype.getType = function () {
        return this.targetType;
    };
    return BindingImpl;
}());
exports.BindingImpl = BindingImpl;
//# sourceMappingURL=binding.js.map