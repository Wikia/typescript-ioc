"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binding_1 = require("./binding");
var utils_1 = require("./utils");
var ContainerImpl = (function () {
    function ContainerImpl() {
        this.bindings = new Map();
    }
    ContainerImpl.prototype.isBound = function (source) {
        utils_1.checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        return !!binding;
    };
    ContainerImpl.prototype.bind = function (source) {
        utils_1.checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        if (!binding) {
            binding = new binding_1.BindingImpl(baseSource, this);
            this.bindings.set(baseSource, binding);
        }
        return binding;
    };
    ContainerImpl.prototype.getInstance = function (source) {
        var binding = this.bind(source);
        return binding.getInstance();
    };
    ContainerImpl.prototype.getType = function (source) {
        utils_1.checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        if (!binding) {
            return source;
        }
        return binding.getType();
    };
    return ContainerImpl;
}());
exports.ContainerImpl = ContainerImpl;
//# sourceMappingURL=container-impl.js.map