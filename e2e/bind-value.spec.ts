import { Container } from '../src';

class TestClass {
  name = 'original master';
}

describe('bind value', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should return given value', () => {
    const value = {
      name: 'just a value',
    };

    container.bind(TestClass).value(value);

    const instance = container.get(TestClass);

    expect(instance).toBe(value);
  });
});
