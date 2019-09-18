import { Container, Injectable, Scope } from '../src';

class TestClass {}

@Injectable()
class MasterClass {
  constructor(public dependency: TestClass) {}
}

describe('scope', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should create singleton by default', () => {
    const instance1 = container.get(TestClass);
    const instance2 = container.get(TestClass);

    expect(instance1).toBe(instance2);
  });

  it('should create singleton when setting scope to singleton', () => {
    container.bind(TestClass).scope(Scope.Singleton);

    const instance1 = container.get(TestClass);
    const instance2 = container.get(TestClass);

    expect(instance1).toBe(instance2);
  });

  it('should create transient when setting scope to transient', () => {
    container.bind(TestClass).scope(Scope.Transient);

    const instance1 = container.get(TestClass);
    const instance2 = container.get(TestClass);

    expect(instance1).not.toBe(instance2);
  });

  it('should work for mixed', () => {
    container.bind(MasterClass).scope(Scope.Transient);

    const instance1 = container.get(MasterClass);
    const instance2 = container.get(MasterClass);

    expect(instance1).not.toBe(instance2);
    expect(instance1.dependency).toBe(instance2.dependency);
  });
});
