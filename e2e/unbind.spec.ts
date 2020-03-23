import { Container, Injectable } from '../src';

class AutobindClass {}

@Injectable({ autobind: false })
class NotAutobindClass {}

describe('unbind', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should work for undefined', () => {
    container.unbind(undefined);
  });

  describe('TypeKey', () => {
    it('should work for autobind', () => {
      const instance1 = container.get(AutobindClass);
      container.unbind(AutobindClass);
      const instance2 = container.get(AutobindClass);

      expect(instance1 instanceof AutobindClass).toBe(true);
      expect(instance2 instanceof AutobindClass).toBe(true);
      expect(instance1).not.toBe(instance2);
    });

    it('should work for not autobind with bind to', () => {
      container.bind(NotAutobindClass).to(NotAutobindClass);
      expect(container.get(NotAutobindClass) instanceof NotAutobindClass).toBe(true);

      container.unbind(NotAutobindClass);
      try {
        container.get(NotAutobindClass);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch('is not bound to anything.');
      }
    });

    it('should work for not autobind with simple bind', () => {
      container.bind(NotAutobindClass);
      expect(container.get(NotAutobindClass) instanceof NotAutobindClass).toBe(true);

      container.unbind(NotAutobindClass);
      try {
        container.get(NotAutobindClass);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch('is not bound to anything.');
      }
    });
  });

  describe('BinderObject', () => {
    it('should work for autobind', () => {
      const instance1 = container.get(AutobindClass);
      container.unbind({ bind: AutobindClass } as any);
      const instance2 = container.get(AutobindClass);

      expect(instance1 instanceof AutobindClass).toBe(true);
      expect(instance2 instanceof AutobindClass).toBe(true);
      expect(instance1).not.toBe(instance2);
    });

    it('should work for not autobind', () => {
      container.bind({ bind: NotAutobindClass, to: NotAutobindClass });
      expect(container.get(NotAutobindClass) instanceof NotAutobindClass).toBe(true);

      container.unbind({ bind: NotAutobindClass, to: NotAutobindClass });
      try {
        container.get(NotAutobindClass);
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toMatch('is not bound to anything.');
      }
    });
  });
});
