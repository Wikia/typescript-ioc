import { Container, Injectable } from '../src';

@Injectable()
class DependencyClass {
  name = 'dependency';
}

@Injectable()
class MasterClass {
  constructor(public dep: DependencyClass) {}
}

describe('manual constructor', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should work', () => {
    const instance = container.get(MasterClass);
    const manual = new MasterClass({ name: 'manual' });

    expect(instance.dep.name).toBe('dependency');
    expect(manual.dep.name).toBe('manual');
  });
});
