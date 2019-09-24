import { Container, Injectable } from '../src';

@Injectable()
class TestClass {
  constructor(public container: Container) {}
}

describe('inject container', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should work', () => {
    const instance = container.get(TestClass);

    expect(instance.container).toBe(container);
  });
});
