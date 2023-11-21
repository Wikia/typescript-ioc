import { BindingScope } from './scope';
import { TypeKey } from './utils';
export interface InjectableOptions {
    autobind?: boolean;
    scope?: BindingScope;
}
export declare function Injectable(options?: InjectableOptions): Function;
export declare function Inject<T extends Function>(identifier: TypeKey<T>): Function;
