import { Inject } from '../../src/decorators';
import IBaseType from './parent-type';

export class Worker {
    @Inject public type: IBaseType;

    public work() {
        this.type.method1();
    }
}
