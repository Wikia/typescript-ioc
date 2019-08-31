import { ConfigImpl } from './config';
import { checkType } from './utils';
var IoCContainer = (function () {
    function IoCContainer() {
    }
    IoCContainer.isBound = function (source) {
        checkType(source);
        var baseSource = source;
        var config = IoCContainer.bindings.get(baseSource);
        return (!!config);
    };
    IoCContainer.bind = function (source) {
        checkType(source);
        var baseSource = source;
        var config = IoCContainer.bindings.get(baseSource);
        if (!config) {
            config = new ConfigImpl(baseSource);
            IoCContainer.bindings.set(baseSource, config);
        }
        return config;
    };
    IoCContainer.get = function (source) {
        var config = IoCContainer.bind(source);
        if (!config.iocprovider) {
            config.to(config.source);
        }
        return config.getInstance();
    };
    IoCContainer.getType = function (source) {
        checkType(source);
        var baseSource = source;
        var config = IoCContainer.bindings.get(baseSource);
        if (!config) {
            throw new TypeError("The type " + source.name + " hasn't been registered with the IOC Container");
        }
        return config.targetSource || config.source;
    };
    IoCContainer.bindings = new Map();
    return IoCContainer;
}());
export { IoCContainer };
//# sourceMappingURL=ioc-container.js.map