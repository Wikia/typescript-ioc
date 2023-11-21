"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCOPES = {
    Singleton: 'Singleton',
    Transient: 'Transient',
};
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
    TransientScope.prototype.resolve = function (creator, source) {
        return creator();
    };
    return TransientScope;
}(Scope));
exports.TransientScope = TransientScope;
var SingletonScope = (function (_super) {
    __extends(SingletonScope, _super);
    function SingletonScope() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.instances = new Map();
        return _this;
    }
    SingletonScope.prototype.resolve = function (creator, source) {
        var instance = this.instances.get(source);
        if (!instance) {
            instance = creator();
            this.instances.set(source, instance);
        }
        return instance;
    };
    SingletonScope.prototype.reset = function (source) {
        this.instances.delete(source);
    };
    return SingletonScope;
}(Scope));
exports.SingletonScope = SingletonScope;
//# sourceMappingURL=scope.js.map