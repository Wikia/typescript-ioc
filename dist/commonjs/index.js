"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (typeof Reflect === 'undefined' || !Reflect.getMetadata) {
    throw new Error("@wikia/dependency-injection requires a reflect polyfill." +
        "Please add 'import \"reflect-metadata\"' (or other Reflection library) to the top of your entry point.");
}
var scope_1 = require("./scope");
exports.SCOPES = scope_1.SCOPES;
var decorators_1 = require("./decorators");
exports.Injectable = decorators_1.Injectable;
exports.Inject = decorators_1.Inject;
var container_1 = require("./container");
exports.Container = container_1.Container;
//# sourceMappingURL=index.js.map