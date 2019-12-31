import { Container, Inject, Injectable } from '../src';

// @ts-ignore
class MockClass {}

// @ts-ignore
// tslint:disable-next-line:no-empty-interface
interface MockInterface {}

@Injectable()
class TestClass {
  // @ts-ignore
  constructor(public container: Container, @Inject('bbb') public bbbProperty: Container) {}
}

describe('inject decorator', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should work', () => {
    const instance = container.get(TestClass);

    expect(instance.container).toBe(container);
  });
});
