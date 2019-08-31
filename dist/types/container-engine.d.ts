import { ConfigImpl } from './config';
export declare class ContainerEngine {
    private bindings;
    isBound(source: Function): boolean;
    bind(source: Function): ConfigImpl;
    get<T extends Function>(source: T): T[keyof T];
    getType(source: Function): Function;
}
