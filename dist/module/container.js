'use strict';
import 'reflect-metadata';
import { IoCContainer } from './ioc-container';
var Container = (function () {
    function Container() {
    }
    Container.bind = function (source) {
        if (!IoCContainer.isBound(source)) {
            return IoCContainer.bind(source).to(source);
        }
        return IoCContainer.bind(source);
    };
    Container.get = function (source) {
        return IoCContainer.get(source);
    };
    Container.getType = function (source) {
        return IoCContainer.getType(source);
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
export { Container };
//# sourceMappingURL=container.js.map