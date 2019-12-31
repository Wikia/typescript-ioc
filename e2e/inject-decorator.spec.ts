import { Container, Inject, Injectable } from '../src';

interface MockInterface {
  name: string;
}

class MockClass implements MockInterface {
  name = 'mock class';
}

@Injectable()
class TestClass {
  constructor(
    public container: Container,
    @Inject('symbol') public symbolParameter: MockInterface,
  ) {}
}

describe('inject decorator', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();

    container.bind('symbol').to(MockClass);
  });

  it('should work', () => {
    const instance = container.get(TestClass);

    expect(instance.container).toBe(container);
    expect(instance.symbolParameter instanceof MockClass).toBe(true);
    expect(instance.symbolParameter.name).toBe('mock class');
  });

  it('should throw if on property', () => {
    try {
      // @ts-ignore
      class ClassWithProperty {
        @Inject('symbol') property: any;
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
        constructor(@Inject('symbol1') @Inject('symbol2') public parameter: any) {}
      }

      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toMatch(
        'Cannot apply @Inject decorator multiple times on the same parameter.',
      );
    }
  });
});
