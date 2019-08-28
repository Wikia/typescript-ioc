"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var utils_1 = require("./utils");
var IoCContainer = (function () {
    function IoCContainer() {
    }
    IoCContainer.isBound = function (source) {
        utils_1.checkType(source);
        var baseSource = source;
        var config = IoCContainer.bindings.get(baseSource);
        return (!!config);
    };
    IoCContainer.bind = function (source) {
        utils_1.checkType(source);
        var baseSource = source;
        var config = IoCContainer.bindings.get(baseSource);
        if (!config) {
            config = new config_1.ConfigImpl(baseSource);
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
        utils_1.checkType(source);
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
    IoCContainer.assertInstantiable = function (target) {
        if (target['__block_Instantiation']) {
            throw new TypeError('Can not instantiate Singleton class. ' +
                'Ask Container for it, using Container.get');
        }
    };
    IoCContainer.bindings = new Map();
    return IoCContainer;
}());
exports.IoCContainer = IoCContainer;
//# sourceMappingURL=ioc-container.js.map