import { Container } from '../src';

describe('manual container', () => {
  let container: Container;

  class DependencyClass {
    name = 'dependency class';
  }

  class DependencyClassImpl implements DependencyClass {
    name = 'dependency class implementation';
  }

  class MasterClass {
    dep = container.get(DependencyClass);
  }

  beforeEach(() => {
    container = new Container();
  });

  it('should get dependency with container', () => {
    const instance = container.get(MasterClass);

    expect(instance.dep.name).toBe('dependency class');
  });

  it('should get dependency with container with bind', () => {
    container.bind(DependencyClass).to(DependencyClassImpl);

    const instance = container.get(MasterClass);

    expect(instance.dep.name).toBe('dependency class implementation');
  });
});
