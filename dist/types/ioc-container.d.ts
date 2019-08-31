import { Config } from './config';
export declare class IoCContainer {
    private static bindings;
    static isBound(source: Function): boolean;
    static bind(source: Function): Config;
    static get(source: Function): any;
    static getType(source: Function): Function;
}
