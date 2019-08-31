import { Provider } from './provider';
import { Scope } from './scope';
export interface Config {
    to(target: Object): this;
    provider(provider: Provider): this;
    scope(scope: Scope): this;
    withParams(...paramTypes: any[]): this;
}
export declare class ConfigImpl implements Config {
    source: Function;
    targetSource: Function;
    iocprovider: Provider;
    iocscope: Scope;
    private paramTypes;
    constructor(source: Function);
    to(target: FunctionConstructor): this;
    private getParameters;
    provider(provider: Provider): this;
    scope(scope: Scope): this;
    withParams(...paramTypes: any[]): this;
    getInstance(): any;
}
