import 'reflect-metadata';
import { Config } from './config';
export declare class Container {
    private engine;
    bind(source: Function): Config;
    get<T extends Function>(source: T): T[keyof T];
    getType(source: Function): Function;
}
