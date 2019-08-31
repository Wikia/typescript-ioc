import { ConfigImpl } from './config';
import { checkType } from './utils';
var ContainerEngine = (function () {
    function ContainerEngine() {
        this.bindings = new Map();
    }
    ContainerEngine.prototype.isBound = function (source) {
        checkType(source);
        var baseSource = source;
        var config = this.bindings.get(baseSource);
        return (!!config);
    };
    ContainerEngine.prototype.bind = function (source) {
        checkType(source);
        var baseSource = source;
        var config = this.bindings.get(baseSource);
        if (!config) {
            config = new ConfigImpl(baseSource, this);
            this.bindings.set(baseSource, config);
        }
        return config;
    };
    ContainerEngine.prototype.get = function (source) {
        var config = this.bind(source);
        if (!config.iocprovider) {
            config.toSelf();
        }
        return config.getInstance();
    };
    ContainerEngine.prototype.getType = function (source) {
        checkType(source);
        var baseSource = source;
        var config = this.bindings.get(baseSource);
        if (!config) {
            throw new TypeError("The type " + source.name + " hasn't been registered with the IOC Container");
        }
        return config.getType();
    };
    return ContainerEngine;
}());
export { ContainerEngine };
//# sourceMappingURL=container-engine.js.map