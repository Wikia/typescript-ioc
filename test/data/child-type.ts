import { Provides } from '../../src/decorators';
import IBaseType from './parent-type';

@Provides(IBaseType)
export default class ChildType implements IBaseType {
    public method1(): void {
        // tslint:disable-next-line:no-console
        console.log('Foo bar');
    }
}
