import { BindingImpl } from './binding';
import { checkType } from './utils';
var ContainerEngine = (function () {
    function ContainerEngine() {
        this.bindings = new Map();
    }
    ContainerEngine.prototype.isBound = function (source) {
        checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        return (!!binding);
    };
    ContainerEngine.prototype.bind = function (source) {
        checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        if (!binding) {
            binding = new BindingImpl(baseSource, this);
            this.bindings.set(baseSource, binding);
        }
        return binding;
    };
    ContainerEngine.prototype.getInstance = function (source) {
        var binding = this.bind(source);
        return binding.getInstance();
    };
    ContainerEngine.prototype.getType = function (source) {
        checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        if (!binding) {
            throw new TypeError("The type " + source.name + " hasn't been registered with the IOC Container");
        }
        return binding.getType();
    };
    return ContainerEngine;
}());
export { ContainerEngine };
//# sourceMappingURL=container-engine.js.map