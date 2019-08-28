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
    IoCContainer.injectProperty = function (target, key, propertyType) {
        var propKey = "__" + key;
        Object.defineProperty(target.prototype, key, {
            enumerable: true,
            get: function () {
                return this[propKey] ? this[propKey] : this[propKey] = IoCContainer.get(propertyType);
            },
            set: function (newValue) {
                this[propKey] = newValue;
            }
        });
    };
    IoCContainer.bindings = new Map();
    return IoCContainer;
}());
export { IoCContainer };
//# sourceMappingURL=ioc-container.js.map