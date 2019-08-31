import { BindingImpl } from './binding';
import { checkType } from './utils';
var ContainerImpl = (function () {
    function ContainerImpl() {
        this.bindings = new Map();
    }
    ContainerImpl.prototype.isBound = function (source) {
        checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        return (!!binding);
    };
    ContainerImpl.prototype.bind = function (source) {
        checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        if (!binding) {
            binding = new BindingImpl(baseSource, this);
            this.bindings.set(baseSource, binding);
        }
        return binding;
    };
    ContainerImpl.prototype.getInstance = function (source) {
        var binding = this.bind(source);
        return binding.getInstance();
    };
    ContainerImpl.prototype.getType = function (source) {
        checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        if (!binding) {
            throw new TypeError("The type " + source.name + " hasn't been registered with the IOC Container");
        }
        return binding.getType();
    };
    return ContainerImpl;
}());
export { ContainerImpl };
//# sourceMappingURL=container-impl.js.map