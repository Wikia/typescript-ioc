import { Container } from '../src';

class MasterClass {
  name = 'master class';
}

class MasterClassImpl implements MasterClass {
  name = 'master class implementation';
}

describe('scope reset', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should not reset scope with bind', () => {
    const instance1 = container.get(MasterClass);

    expect(instance1.name).toBe('master class');

    container.bind(MasterClass);

    const instance2 = container.get(MasterClass);

    expect(instance1).toBe(instance2);
  });

  it('should reset scope with bind.to', () => {
    const instance1 = container.get(MasterClass);

    expect(instance1.name).toBe('master class');

    container.bind(MasterClass).to(MasterClassImpl);

    const instance2 = container.get(MasterClass);

    expect(instance2.name).toBe('master class implementation');
  });

  it('should reset scope with bind.to for the same Class', () => {
    const instance1 = container.get(MasterClass);

    container.bind(MasterClass).to(MasterClass);

    const instance2 = container.get(MasterClass);

    expect(instance1).not.toBe(instance2);
  });

  it('should reset scope with bind.provider', () => {
    const instance1 = container.get(MasterClass);

    expect(instance1.name).toBe('master class');

    container.bind(MasterClass).provider(() => new MasterClassImpl());

    const instance2 = container.get(MasterClass);

    expect(instance2.name).toBe('master class implementation');
  });
});
