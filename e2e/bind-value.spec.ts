import { Container } from '../src';

class TestClass {
  name = 'original master';
}

describe('bind value', () => {
  let container: Container;
  const value = {
    name: 'just a value',
  };

  beforeEach(() => {
    container = new Container();
  });

  describe('TypeKey', () => {
    it('should return given value', () => {
      container.bind(TestClass).value(value);

      const instance = container.get(TestClass);

      expect(instance).toBe(value);
    });
  });

  describe('BinderObject', () => {
    it('should return given value', () => {
      container.bind({ bind: TestClass, value });

      const instance = container.get(TestClass);

      expect(instance).toBe(value);
    });
  });
});
