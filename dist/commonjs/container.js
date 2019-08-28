'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var ioc_container_1 = require("./ioc-container");
var Container = (function () {
    function Container() {
    }
    Container.bind = function (source) {
        if (!ioc_container_1.IoCContainer.isBound(source)) {
            return ioc_container_1.IoCContainer.bind(source).to(source);
        }
        return ioc_container_1.IoCContainer.bind(source);
    };
    Container.get = function (source) {
        return ioc_container_1.IoCContainer.get(source);
    };
    Container.getType = function (source) {
        return ioc_container_1.IoCContainer.getType(source);
    };
    Container.snapshot = function (source) {
        var config = Container.bind(source);
        Container.snapshots.providers.set(source, config.iocprovider);
        if (config.iocscope) {
            Container.snapshots.scopes.set(source, config.iocscope);
        }
        return;
    };
    Container.restore = function (source) {
        if (!(Container.snapshots.providers.has(source))) {
            throw new TypeError('Config for source was never snapshoted.');
        }
        var config = Container.bind(source);
        config.provider(Container.snapshots.providers.get(source));
        if (Container.snapshots.scopes.has(source)) {
            config.scope(Container.snapshots.scopes.get(source));
        }
    };
    Container.snapshots = {
        providers: new Map(),
        scopes: new Map(),
    };
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=container.js.map