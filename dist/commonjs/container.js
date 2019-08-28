'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var ioc_container_1 = require("./ioc-container");
var Container = (function () {
    function Container() {
        this.snapshots = {
            providers: new Map(),
            scopes: new Map(),
        };
    }
    Container.prototype.bind = function (source) {
        if (!ioc_container_1.IoCContainer.isBound(source)) {
            return ioc_container_1.IoCContainer.bind(source).to(source);
        }
        return ioc_container_1.IoCContainer.bind(source);
    };
    Container.prototype.get = function (source) {
        return ioc_container_1.IoCContainer.get(source);
    };
    Container.prototype.getType = function (source) {
        return ioc_container_1.IoCContainer.getType(source);
    };
    Container.prototype.snapshot = function (source) {
        var config = this.bind(source);
        this.snapshots.providers.set(source, config.iocprovider);
        if (config.iocscope) {
            this.snapshots.scopes.set(source, config.iocscope);
        }
        return;
    };
    Container.prototype.restore = function (source) {
        if (!(this.snapshots.providers.has(source))) {
            throw new TypeError('Config for source was never snapshoted.');
        }
        var config = this.bind(source);
        config.provider(this.snapshots.providers.get(source));
        if (this.snapshots.scopes.has(source)) {
            config.scope(this.snapshots.scopes.get(source));
        }
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=container.js.map