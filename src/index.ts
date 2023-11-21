if (typeof Reflect === 'undefined' || !Reflect.getMetadata) {
  throw new Error(
    `@wikia/dependency-injection requires a reflect polyfill.` +
      `Please add 'import "reflect-metadata"' (or other Reflection library) to the top of your entry point.`,
  );
}

export { BindingScope, SCOPES } from './scope';
export { Injectable, Inject } from './decorators';
export { Binding } from './binding';
export { Container } from './container';
export { Provider } from './provider';
