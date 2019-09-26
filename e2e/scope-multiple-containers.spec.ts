import { Container, Injectable } from '../src';

@Injectable()
class TestClass {
  name = 'original master';
}

describe('scope multiple containers', () => {
  it('should return different instances', () => {
    const container1 = new Container();
    const container2 = new Container();

    const instance1 = container1.get(TestClass);
    const instance2 = container2.get(TestClass);

    expect(instance1).not.toBe(instance2);
  });

  it('should return different instances - pre-get', () => {
    const container1 = new Container();
    const container2 = new Container();

    // getting instance for the first time binds the type
    // it also resets scope for that type
    // we need to do it here to observe correct behaviour
    container1.get(TestClass);
    container2.get(TestClass);

    const instance1 = container1.get(TestClass);
    const instance2 = container2.get(TestClass);

    expect(instance1).not.toBe(instance2);
  });

  it('should return different instances - pre-bind', () => {
    const container1 = new Container();
    const container2 = new Container();

    // should behave exactly like above example
    container1.bind(TestClass);
    container2.bind(TestClass);

    const instance1 = container1.get(TestClass);
    const instance2 = container2.get(TestClass);

    expect(instance1).not.toBe(instance2);
  });
});
