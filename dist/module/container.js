import 'reflect-metadata';
import { ContainerEngine } from './container-engine';
var Container = (function () {
    function Container() {
        this.engine = new ContainerEngine();
    }
    Container.prototype.bind = function (source) {
        if (!this.engine.isBound(source)) {
            return this.engine.bind(source).to(source);
        }
        return this.engine.bind(source);
    };
    Container.prototype.get = function (source) {
        return this.engine.getInstance(source);
    };
    Container.prototype.getType = function (source) {
        return this.engine.getType(source);
    };
    return Container;
}());
export { Container };
//# sourceMappingURL=container.js.map