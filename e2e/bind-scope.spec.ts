import { Container, Injectable, Scope } from '../src';

class Base {}

class BaseImp implements Base {}

class TestClass {}

@Injectable()
class MasterClass {
  constructor(public dependency: TestClass) {}
}

describe('bind scope', () => {
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

  it('should assign scope to father/base class', () => {
    container
      .bind(Base)
      .to(BaseImp)
      .scope(Scope.Transient);

    let instance1 = container.get(Base);
    let instance2 = container.get(Base);

    // is not transient because BaseImpl is not set to transient
    expect(instance1).toBe(instance2);

    container.bind(BaseImp).scope(Scope.Transient);
    instance1 = container.get(Base);
    instance2 = container.get(Base);

    // is transient because now BaseImpl is set to transient
    expect(instance1).not.toBe(instance2);
  });
});
