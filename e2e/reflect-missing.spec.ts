describe('reflect missing', () => {
  it('should throw error', () => {
    // @ts-ignore
    Reflect = undefined;

    expect(() => require('../src')).toThrowError(
      `@wikia/dependency-injection requires a reflect polyfill.` +
        `Please add 'import "reflect-metadata"' (or other Reflection library) to the top of your entry point.`,
    );
  });
});
