import { Container } from '../src';

class DependencyClass {}

class MasterClass {
  constructor(public dep: DependencyClass) {}
}

describe('bind with params', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should not work', () => {
    const instance = container.get(MasterClass);

    expect(instance.dep).toBe(undefined);
  });

  it('should work', () => {
    container.bind(MasterClass).withParams(DependencyClass);

    const instance = container.get(MasterClass);

    expect(instance.dep instanceof DependencyClass).toBe(true);
  });
});
