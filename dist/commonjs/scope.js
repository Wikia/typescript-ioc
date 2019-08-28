"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Scope = (function () {
    function Scope() {
    }
    Scope.prototype.reset = function (source) {
    };
    return Scope;
}());
exports.Scope = Scope;
var TransientScope = (function (_super) {
    __extends(TransientScope, _super);
    function TransientScope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransientScope.prototype.resolve = function (provider, source) {
        return provider.get();
    };
    return TransientScope;
}(Scope));
var SingletonScope = (function (_super) {
    __extends(SingletonScope, _super);
    function SingletonScope() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SingletonScope.prototype.resolve = function (provider, source) {
        var instance = SingletonScope.instances.get(source);
        if (!instance) {
            source['__block_Instantiation'] = false;
            instance = provider.get();
            source['__block_Instantiation'] = true;
            SingletonScope.instances.set(source, instance);
        }
        return instance;
    };
    SingletonScope.prototype.reset = function (source) {
        SingletonScope.instances.delete(source);
    };
    SingletonScope.instances = new Map();
    return SingletonScope;
}(Scope));
Scope.Transient = new TransientScope();
Scope.Singleton = new SingletonScope();
//# sourceMappingURL=scope.js.map