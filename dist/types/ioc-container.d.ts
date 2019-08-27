import { Config } from './config';
export declare class IoCContainer {
    static isBound(source: Function): boolean;
    static bind(source: Function): Config;
    static get(source: Function): any;
    static getType(source: Function): Function;
    static injectProperty(target: Function, key: string, propertyType: Function): void;
    private static bindings;
}
