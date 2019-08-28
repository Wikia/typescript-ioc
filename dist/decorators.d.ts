import { Provider } from './provider';
import { Scope } from './scope';
export declare function Scoped(scope: Scope): (target: Function) => void;
export declare function Provided(provider: Provider): (target: Function) => void;
export declare function Inject(target: any, targetKey: string, index?: number): any;
