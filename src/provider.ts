import { Container } from './container';

/**
 * Factory method, that should create the bind instance.
 * @return the instance to be used by the Container
 */
export type Provider<T = any> = (container: Container) => T;
