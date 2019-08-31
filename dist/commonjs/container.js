"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var container_impl_1 = require("./container-impl");
var Container = (function () {
    function Container() {
        this.container = new container_impl_1.ContainerImpl();
    }
    Container.prototype.bind = function (source) {
        if (!this.container.isBound(source)) {
            return this.container.bind(source).to(source);
        }
        return this.container.bind(source);
    };
    Container.prototype.get = function (source) {
        return this.container.getInstance(source);
    };
    Container.prototype.getType = function (source) {
        return this.container.getType(source);
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=container.js.map