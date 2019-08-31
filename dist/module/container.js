import 'reflect-metadata';
import { ContainerImpl } from './container-impl';
var Container = (function () {
    function Container() {
        this.container = new ContainerImpl();
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
export { Container };
//# sourceMappingURL=container.js.map