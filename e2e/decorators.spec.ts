import { Container, Injectable } from '../src';

describe('@Injectable decorator', () => {
  @Injectable()
  class ClassWithDecorator {
    id = 'class with decorator';
  }

  class ClassWithoutDecorator {
    id = 'class without decorator';
  }

  @Injectable()
  class ConstructorClassWithDecorator {
    constructor(public dep1: ClassWithDecorator, public dep2: ClassWithoutDecorator) {}
  }

  class ConstructorClassWithoutDecorator {
    constructor(public dep1: ClassWithDecorator, public dep2: ClassWithoutDecorator) {}
  }

  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should pass for ConstructorClassWithDecorator', () => {
    const instance = container.get(ConstructorClassWithDecorator);
    expect(instance.dep1 instanceof ClassWithDecorator).toBe(true);
    expect(instance.dep2 instanceof ClassWithoutDecorator).toBe(true);
  });

  it('should fail for ConstructorClassWithoutDecorator', () => {
    const instance = container.get(ConstructorClassWithoutDecorator);
    expect(instance.dep1).toBe(undefined);
    expect(instance.dep2).toBe(undefined);
  });

  it('should throw if double decorators', () => {
    try {
      @Injectable()
      @Injectable()
      class DoubleDecorators {}

      // @ts-ignore
      const instance = new DoubleDecorators();
      expect(false).toBe(true);
    } catch (e) {
      expect(e.message).toMatch('Cannot apply @Injectable decorator multiple times.');
    }
  });
});
