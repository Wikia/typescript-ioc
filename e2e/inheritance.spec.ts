import { Container, Injectable } from '../src';

class DependencyClass {}

class ParentClass {
  constructor(public dependency: DependencyClass) {}
}

@Injectable()
class ChildClass extends ParentClass {
  constructor(dependency: DependencyClass) {
    super(dependency);
  }
}

describe('inheritance', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should work', () => {
    const instance = container.get(ChildClass);

    expect(instance instanceof ChildClass).toBe(true);
    expect(instance.dependency instanceof DependencyClass).toBe(true);
  });
});
