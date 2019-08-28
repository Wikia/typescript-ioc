import 'reflect-metadata';
import { Config } from './config';
export declare class Container {
    static bind(source: Function): Config;
    static get<T extends Function>(source: T): T[keyof T];
    static getType(source: Function): Function;
    static snapshot(source: Function): void;
    static restore(source: Function): void;
    private static snapshots;
}
