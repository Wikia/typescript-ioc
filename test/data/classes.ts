import { Inject } from '../../src/decorators';
import IBaseType from './parent-type';

export class Worker {
    @Inject type: IBaseType;

    work() {
        this.type.method1();
    }
}
