import { Container } from '../src/container';

abstract class AbsClass {
  abstract method(): void;
}

class ConcreteClass implements AbsClass {
  method(): void {
    // do something
  }
}

describe('abstract type', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should be able to bind', () => {
    container.bind(AbsClass).to(ConcreteClass);
  });

  it('should be able to get', () => {
    container.get(AbsClass);
  });

  it('should be able to get type', () => {
    container.getType(AbsClass);
  });
});
