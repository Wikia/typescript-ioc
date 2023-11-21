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
import { applyBinder } from './binder';
import { BindingImpl } from './binding';
import { SCOPES, SingletonScope, TransientScope } from './scope';
import { assertTypeKey, isType, isTypeKey } from './utils';
var Container = (function () {
    function Container(containerOptions) {
        if (containerOptions === void 0) { containerOptions = {}; }
        this.bindings = new Map();
        this.scopes = {
            Singleton: new SingletonScope(),
            Transient: new TransientScope(),
        };
        this.containerOptions = __assign({ defaultScope: SCOPES.Singleton, defaultAutobind: true }, containerOptions);
        this.bind(Container)
            .scope(SCOPES.Singleton)
            .value(this);
    }
    Container.prototype.bind = function (binder) {
        var key = isTypeKey(binder) ? binder : binder === null || binder === void 0 ? void 0 : binder.bind;
        if (this.bindings.has(key)) {
            return this.bindings.get(key);
        }
        if (isType(binder)) {
            return applyBinder(this.ensureBinding(key), { bind: binder, to: binder });
        }
        if (isTypeKey(binder)) {
            return this.ensureBinding(key);
        }
        return applyBinder(this.ensureBinding(key), binder);
    };
    Container.prototype.unbind = function (binder) {
        var typeType = isTypeKey(binder) ? binder : binder === null || binder === void 0 ? void 0 : binder.bind;
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
        assertTypeKey(sourceType);
        var binding = this.bindings.get(sourceType);
        if (!binding) {
            binding = new BindingImpl(sourceType, this, this.scopes, this.containerOptions);
            this.bindings.set(sourceType, binding);
        }
        return binding;
    };
    return Container;
}());
export { Container };
//# sourceMappingURL=container.js.map