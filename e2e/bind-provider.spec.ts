import { Container, Injectable } from '../src';

class DependencyClass {
  name = 'dependency class';
}

@Injectable()
class MasterClass {
  name = 'original master';

  constructor(public dep: any) {}
}

describe('bind provider', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  describe('TypeKey', () => {
    it('should return given instance from inner container', () => {
      container.bind(MasterClass).provider((innerContainer: Container) => {
        const dep = innerContainer.get(DependencyClass);

        return new MasterClass(dep);
      });

      const instance = container.get(MasterClass);

      expect(instance.dep instanceof DependencyClass).toBe(true);
    });

    it('should return given instance from actual container', () => {
      container.bind(MasterClass).provider(() => {
        const dep = container.get(DependencyClass);

        return new MasterClass(dep);
      });

      const instance = container.get(MasterClass);

      expect(instance.dep instanceof DependencyClass).toBe(true);
    });
  });

  describe('BinderObject', () => {
    it('should return given instance from inner container', () => {
      container.bind({
        bind: MasterClass,
        provider: (innerContainer: Container) => {
          const dep = innerContainer.get(DependencyClass);

          return new MasterClass(dep);
        },
      });

      const instance = container.get(MasterClass);

      expect(instance.dep instanceof DependencyClass).toBe(true);
    });

    it('should return given instance from actual container', () => {
      container.bind({
        bind: MasterClass,
        provider: () => {
          const dep = container.get(DependencyClass);

          return new MasterClass(dep);
        },
      });

      const instance = container.get(MasterClass);

      expect(instance.dep instanceof DependencyClass).toBe(true);
    });
  });
});
