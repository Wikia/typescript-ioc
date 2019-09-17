import * as chai from 'chai';
import 'mocha';
import { Container } from '../../src/container';
import { Injectable } from '../../src/decorators';

const expect = chai.expect;

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
    expect(instance.dep1 instanceof ClassWithDecorator).to.be.true;
    expect(instance.dep2 instanceof ClassWithoutDecorator).to.be.true;
  });

  it('should fail for ConstructorClassWithoutDecorator', () => {
    const instance = container.get(ConstructorClassWithoutDecorator);
    expect(instance.dep1 instanceof ClassWithDecorator).to.be.false;
    expect(instance.dep2 instanceof ClassWithoutDecorator).to.be.false;
  });
});
