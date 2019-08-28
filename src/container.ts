'use strict';
/**
 * This is a lightweight annotation-based dependency injection container for typescript.
 *
 * Visit the project page on [GitHub] (https://github.com/thiagobustamante/typescript-ioc).
 */

import 'reflect-metadata';
import { Config, ConfigImpl } from './config';
import { IoCContainer } from './ioc-container';
import { Provider } from './provider';
import { Scope } from './scope';

/**
 * The IoC Container class. Can be used to register and to retrieve your dependencies.
 * You can also use de decorators [[Scoped]], [[Singleton]], [[Provided]] and [[Provides]]
 * to configure the dependency directly on the class.
 */
export class Container {
    /**
     * Internal storage for snapshots
     * @type {providers: Map<Function, Provider>; scopes: Map<Function, Scope>}
     */
    private snapshots: { providers: Map<Function, Provider>; scopes: Map<Function, Scope> } = {
        providers: new Map(),
        scopes: new Map(),
    };

    /**
     * Add a dependency to the Container. If this type is already present, just return its associated
     * configuration object.
     * Example of usage:
     *
     * ```
     * Container.bind(PersonDAO).to(ProgrammerDAO).scope(Scope.Singleton);
     * ```
     * @param source The type that will be bound to the Container
     * @return a container configuration
     */
    bind(source: Function): Config {
        if (!IoCContainer.isBound(source)) {
            return IoCContainer.bind(source).to(source);
        }

        return IoCContainer.bind(source);
    }

    /**
     * Retrieve an object from the container. It will resolve all dependencies and apply any type replacement
     * before return the object.
     * If there is no declared dependency to the given source type, an implicity bind is performed to this type.
     * @param source The dependency type to resolve
     * @return an object resolved for the given source type;
     */
    get<T extends Function>(source: T): T[keyof T] {
        return IoCContainer.get(source);
    }

    /**
     * Retrieve a type associated with the type provided from the container
     * @param source The dependency type to resolve
     * @return an object resolved for the given source type;
     */
    getType(source: Function) {
        return IoCContainer.getType(source);
    }

    /**
     * Store the state for a specified binding.  Can then be restored later.   Useful for testing.
     * @param source The dependency type
     */
    snapshot(source: Function): void {
        const config = this.bind(source) as ConfigImpl;
        this.snapshots.providers.set(source, config.iocprovider);
        if (config.iocscope) {
            this.snapshots.scopes.set(source, config.iocscope);
        }
        return;
    }

    /**
     * Restores the state for a specified binding that was previously captured by snapshot.
     * @param source The dependency type
     */
    restore(source: Function): void {
        if (!(this.snapshots.providers.has(source))) {
            throw new TypeError('Config for source was never snapshoted.');
        }
        const config = this.bind(source);
        config.provider(this.snapshots.providers.get(source));
        if (this.snapshots.scopes.has(source)) {
            config.scope(this.snapshots.scopes.get(source));
        }
    }
}

