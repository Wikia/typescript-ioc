import { Container, Inject, Injectable } from '../src';

interface MockInterface {
  name: string;
}

class MockClass implements MockInterface {
  name = 'mock class';
}

const symbol = Symbol('symbol');

@Injectable()
class TestClass {
  constructor(
    public container: Container,
    @Inject('string') public stringParameter: MockInterface,
    @Inject(symbol) public symbolParameter: MockInterface,
  ) {}
}

describe('inject decorator', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should work with binder object', () => {
    container.bind({ bind: 'string', to: MockClass });
    container.bind({ bind: symbol, value: new MockClass() });

    const instance = container.get(TestClass);

    expect(instance.container).toBe(container);
    expect(instance.stringParameter instanceof MockClass).toBe(true);
    expect(instance.stringParameter.name).toBe('mock class');
    expect(instance.symbolParameter instanceof MockClass).toBe(true);
    expect(instance.symbolParameter.name).toBe('mock class');
  });

  it('should throw without providing', () => {
    try {
      container.get(TestClass);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toMatch('is not bound to anything.');
    }
  });

  it('should throw without providing (symbol itself)', () => {
    try {
      container.get(symbol);
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toMatch('is not bound to anything.');
    }
  });

  it('should throw without providing (string itself)', () => {
    try {
      container.get('string');
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toMatch('is not bound to anything.');
    }
  });

  describe('provided symbols', () => {
    beforeEach(() => {
      container.bind('string').to(MockClass);
      container.bind(symbol).to(MockClass);
    });

    it('should work', () => {
      const instance = container.get(TestClass);

      expect(instance.container).toBe(container);
      expect(instance.stringParameter instanceof MockClass).toBe(true);
      expect(instance.stringParameter.name).toBe('mock class');
      expect(instance.symbolParameter instanceof MockClass).toBe(true);
      expect(instance.symbolParameter.name).toBe('mock class');
    });

    it('should throw if on property', () => {
      try {
        // @ts-ignore
        class ClassWithProperty {
          @Inject('string') property: any;
        }

        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toMatch('Cannot apply @Inject decorator to a property.');
      }
    });

    it('should throw if on multiple times', () => {
      try {
        // @ts-ignore
        class ClassWithParameter {
          constructor(@Inject('string1') @Inject('string2') public parameter: any) {}
        }

        expect(true).toBe(false);
      } catch (e) {
        expect(e.message).toMatch(
          'Cannot apply @Inject decorator multiple times on the same parameter.',
        );
      }
    });
  });
});
