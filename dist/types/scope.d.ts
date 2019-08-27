import { Provider } from './provider';
export declare abstract class Scope {
    static Transient: Scope;
    static Singleton: Scope;
    abstract resolve(provider: Provider, source: Function): any;
    reset(source: Function): void;
}
