declare type Creator<T = any> = () => T;
export declare abstract class Scope {
    static Transient: Scope;
    static Singleton: Scope;
    abstract resolve(creator: Creator, source: Function): any;
    reset(source: Function): void;
}
export {};
