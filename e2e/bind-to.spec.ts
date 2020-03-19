import { Container, Injectable } from '../src';

@Injectable()
class DependencyClass {
  name = 'original dependency';
}

@Injectable()
class MasterClass {
  name = 'original master';

  constructor(public dep: DependencyClass) {}
}

@Injectable()
class DependencyClassImpl implements DependencyClass {
  name = 'implementation dependency';
}

@Injectable()
class MasterClassImpl implements MasterClass {
  name = 'implementation master';

  constructor(public dep: DependencyClass) {}
}

describe('bind to', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should work for original classes', () => {
    const instance = container.get(MasterClass);

    expect(instance.name).toBe('original master');
    expect(instance.dep.name).toBe('original dependency');
  });

  it('should work for implementation classes', () => {
    container.bind(MasterClass).to(MasterClassImpl);
    container.bind(DependencyClass).to(DependencyClassImpl);

    const instance = container.get(MasterClass);

    expect(instance.name).toBe('implementation master');
    expect(instance.dep.name).toBe('implementation dependency');
  });

  it('should work for original master and implementation dependency', () => {
    container.bind(DependencyClass).to(DependencyClassImpl);

    const instance = container.get(MasterClass);

    expect(instance.name).toBe('original master');
    expect(instance.dep.name).toBe('implementation dependency');
  });

  it('should work for implementation master and original dependency', () => {
    container.bind(MasterClass).to(MasterClassImpl);

    const instance = container.get(MasterClass);

    expect(instance.name).toBe('implementation master');
    expect(instance.dep.name).toBe('original dependency');
  });

  it('should throw for undefined', () => {
    expect(() => container.bind(undefined)).toThrow(
      TypeError(
        'Invalid type requested to IoC container. TypeKey must be Class, symbol or string.',
      ),
    );
  });

  it('should throw when binding to invalid', () => {
    expect(() => container.bind(MasterClass).to('invalid' as any)).toThrow(
      TypeError('Invalid type requested to IoC container. Type must be Class.'),
    );
  });
});
