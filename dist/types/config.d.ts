import { Provider } from './provider';
import { Scope } from './scope';
export interface Config {
    to(target: Object): Config;
    provider(provider: Provider): Config;
    scope(scope: Scope): Config;
    withParams(...paramTypes: Array<any>): Config;
}
export declare class ConfigImpl implements Config {
    source: Function;
    targetSource: Function;
    iocprovider: Provider;
    iocscope: Scope;
    private paramTypes;
    constructor(source: Function);
    to(target: FunctionConstructor): this;
    provider(provider: Provider): this;
    scope(scope: Scope): this;
    withParams(...paramTypes: Array<any>): this;
    getInstance(): any;
    private getParameters;
}
