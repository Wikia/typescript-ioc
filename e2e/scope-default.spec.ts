import { Container, Injectable, SCOPES } from '../src';

@Injectable()
class TestClass {
  name = 'original master';
}

describe('scope default', () => {
  it('should return singleton if config is not specified', () => {
    const container = new Container();
    const instance1 = container.get(TestClass);
    const instance2 = container.get(TestClass);

    expect(instance1).toBe(instance2);
  });

  it('should return singleton if specified in the config', () => {
    const container = new Container({ defaultScope: SCOPES.Singleton });
    const instance1 = container.get(TestClass);
    const instance2 = container.get(TestClass);

    expect(instance1).toBe(instance2);
  });

  it('should return transient if specified in the config', () => {
    const container = new Container({ defaultScope: SCOPES.Transient });
    const instance1 = container.get(TestClass);
    const instance2 = container.get(TestClass);

    expect(instance1).not.toBe(instance2);
  });
});
