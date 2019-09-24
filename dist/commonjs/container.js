"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var binding_1 = require("./binding");
var scope_1 = require("./scope");
var utils_1 = require("./utils");
var Container = (function () {
    function Container() {
        this.bindings = new Map();
        this.bind(Container)
            .scope(scope_1.Scope.Singleton)
            .value(this);
    }
    Container.prototype.bind = function (source) {
        if (!this.isBound(source)) {
            return this.getBinding(source).to(source);
        }
        return this.getBinding(source);
    };
    Container.prototype.isBound = function (source) {
        utils_1.checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        return !!binding;
    };
    Container.prototype.getBinding = function (source) {
        utils_1.checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        if (!binding) {
            binding = new binding_1.BindingImpl(baseSource, this);
            this.bindings.set(baseSource, binding);
        }
        return binding;
    };
    Container.prototype.get = function (source) {
        var binding = this.getBinding(source);
        return binding.getInstance();
    };
    Container.prototype.getType = function (source) {
        var binding = this.getBinding(source);
        return binding.getType();
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=container.js.map