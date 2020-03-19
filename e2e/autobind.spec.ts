import { Container, Injectable } from '../src';

@Injectable()
class TestClass {}

@Injectable({ autobind: true })
class TestTrueClass {}

@Injectable({ autobind: false })
class TestFalseClass {}

describe('autobind', () => {
  it('should autobind if config is not specified', () => {
    const container = new Container();
    const instance = container.get(TestClass);

    expect(instance instanceof TestClass).toBe(true);
  });

  it('should autobind if config is specified', () => {
    const container = new Container({ defaultAutobind: true });
    const instance = container.get(TestClass);

    expect(instance instanceof TestClass).toBe(true);
  });

  it('should not autobind if config is specified', () => {
    const container = new Container({ defaultAutobind: false });

    try {
      container.get(TestClass);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toMatch('is not bound to anything.');
    }
  });

  it('should not autobind if specified in decorator', () => {
    const container = new Container({ defaultAutobind: true });

    try {
      container.get(TestFalseClass);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toMatch('is not bound to anything.');
    }
  });

  it('should autobind if specified in decorator', () => {
    const container = new Container({ defaultAutobind: false });
    const instance = container.get(TestTrueClass);

    expect(instance instanceof TestTrueClass).toBe(true);
  });
});
