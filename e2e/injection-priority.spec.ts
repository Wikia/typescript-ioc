import { Container, Inject, Injectable } from '../src';

class A {
  name = 'a';
}

class B {
  name = 'b';
}

class C {
  name = 'c';
}

@Injectable()
class TestClass {
  constructor(public param1: C, @Inject('symbol') public param2: C) {}
}

describe('injection priority', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
    container.bind('symbol').to(B);
  });

  it('should be always overwritten by withTypes', () => {
    container.bind(TestClass).withParams(A, A);
    const instance = container.get(TestClass);

    expect(instance.param1.name).toBe('a');
    expect(instance.param2.name).toBe('a');
  });

  it('should by overwritten by Inject', () => {
    const instance = container.get(TestClass);

    expect(instance.param1.name).toBe('c');
    expect(instance.param2.name).toBe('b');
  });
});
