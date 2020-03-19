import { Container, Injectable, SCOPES } from '../src';

@Injectable()
class TestClass {}

@Injectable({ scope: SCOPES.Transient })
class TestTransientClass {}

@Injectable({ scope: SCOPES.Singleton })
class TestSingletonClass {}

describe('scope', () => {
  it('should return singleton if config is not specified', () => {
    const container = new Container();
    const instance1 = container.get(TestClass);
    const instance2 = container.get(TestClass);

    expect(instance1).toBe(instance2);
  });

  it('should return transient if specified in decorator', () => {
    const container = new Container({ defaultScope: SCOPES.Singleton });
    const instance1 = container.get(TestTransientClass);
    const instance2 = container.get(TestTransientClass);

    expect(instance1).not.toBe(instance2);
  });

  it('should return singleton if specified in decorator', () => {
    const container = new Container({ defaultScope: SCOPES.Transient });
    const instance1 = container.get(TestSingletonClass);
    const instance2 = container.get(TestSingletonClass);

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
