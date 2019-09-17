/* tslint:disable:max-classes-per-file */
import { Container } from './container';
import { Injectable } from './decorators';

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

describe('@Injectable decorator', () => {
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
    expect(instance.dep1 instanceof ClassWithDecorator).toBe(false);
    expect(instance.dep2 instanceof ClassWithoutDecorator).toBe(false);
  });
});
