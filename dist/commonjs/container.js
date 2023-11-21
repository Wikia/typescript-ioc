"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var binder_1 = require("./binder");
var binding_1 = require("./binding");
var scope_1 = require("./scope");
var utils_1 = require("./utils");
var Container = (function () {
    function Container(containerOptions) {
        if (containerOptions === void 0) { containerOptions = {}; }
        this.bindings = new Map();
        this.scopes = {
            Singleton: new scope_1.SingletonScope(),
            Transient: new scope_1.TransientScope(),
        };
        this.containerOptions = __assign({ defaultScope: scope_1.SCOPES.Singleton, defaultAutobind: true }, containerOptions);
        this.bind(Container)
            .scope(scope_1.SCOPES.Singleton)
            .value(this);
    }
    Container.prototype.bind = function (binder) {
        var key = utils_1.isTypeKey(binder) ? binder : binder === null || binder === void 0 ? void 0 : binder.bind;
        if (this.bindings.has(key)) {
            return this.bindings.get(key);
        }
        if (utils_1.isType(binder)) {
            return binder_1.applyBinder(this.ensureBinding(key), { bind: binder, to: binder });
        }
        if (utils_1.isTypeKey(binder)) {
            return this.ensureBinding(key);
        }
        return binder_1.applyBinder(this.ensureBinding(key), binder);
    };
    Container.prototype.unbind = function (binder) {
        var typeType = utils_1.isTypeKey(binder) ? binder : binder === null || binder === void 0 ? void 0 : binder.bind;
        this.bindings.delete(typeType);
    };
    Container.prototype.get = function (source) {
        var binding = this.ensureBinding(source);
        return binding.getInstance();
    };
    Container.prototype.getType = function (source) {
        var binding = this.ensureBinding(source);
        return binding.getType();
    };
    Container.prototype.ensureBinding = function (sourceType) {
        utils_1.assertTypeKey(sourceType);
        var binding = this.bindings.get(sourceType);
        if (!binding) {
            binding = new binding_1.BindingImpl(sourceType, this, this.scopes, this.containerOptions);
            this.bindings.set(sourceType, binding);
        }
        return binding;
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=container.js.map