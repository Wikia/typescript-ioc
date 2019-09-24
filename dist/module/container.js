import 'reflect-metadata';
import { BindingImpl } from './binding';
import { Scope } from './scope';
import { checkType } from './utils';
var Container = (function () {
    function Container() {
        this.bindings = new Map();
        this.bind(Container)
            .scope(Scope.Singleton)
            .value(this);
    }
    Container.prototype.bind = function (source) {
        if (!this.isBound(source)) {
            return this.getBinding(source).to(source);
        }
        return this.getBinding(source);
    };
    Container.prototype.isBound = function (source) {
        checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        return !!binding;
    };
    Container.prototype.getBinding = function (source) {
        checkType(source);
        var baseSource = source;
        var binding = this.bindings.get(baseSource);
        if (!binding) {
            binding = new BindingImpl(baseSource, this);
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
export { Container };
//# sourceMappingURL=container.js.map