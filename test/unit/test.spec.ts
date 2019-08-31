import * as assert from 'assert';
import * as chai from 'chai';
import 'mocha';
import 'reflect-metadata';
import { Container } from '../../src/container';
import { Inject } from '../../src/decorators';
import { Scope } from '../../src/scope';

const container = new Container();
const expect = chai.expect;

// tslint:disable:no-unused-expression
describe('@Inject annotation on a property', () => {

  class SimpleInject {
    @Inject dateProperty: Date;
  }

  class ConstructorSimpleInject {
    @Inject aDateProperty: Date;

    testOK: boolean;

    constructor() {
      if (this.aDateProperty) {
        this.testOK = true;
      }
    }
  }

  abstract class AbsClass {
    constructor(public date: Date) { }
  }

  class ConstructorInjected extends AbsClass {
    constructor(@Inject public anotherDate: Date) {
      super(anotherDate);
    }
  }

  it('should inject a new value on the property field', () => {
    const instance: SimpleInject = new SimpleInject();
    expect(instance.dateProperty).to.exist;
  });

  it('should inject a new value on the property field that is accessible inside class constructor', () => {
    const instance: ConstructorSimpleInject = new ConstructorSimpleInject();
    expect(instance.testOK).to.equal(true);
  });

  it('should inject a new value on the property field that is injected into constructor', () => {
    const instance: ConstructorInjected = container.get(ConstructorInjected);
    expect(instance.anotherDate).to.exist;
    expect(instance.date).to.exist;
    expect(instance.date).to.equal(instance.anotherDate);
  });
});

describe('@Inject annotation on Constructor parameter', () => {
  const constructorsArgs: Array<any> = new Array<any>();
  const constructorsMultipleArgs: Array<any> = new Array<any>();

  class TestConstructor {
    injectedDate: Date;

    constructor(@Inject date: Date) {
      constructorsArgs.push(date);
      this.injectedDate = date;
    }
  }

  class TestConstructor2 {
    @Inject
    teste1: TestConstructor;
  }

  it('should inject a new value as argument on cosntrutor call, when parameter is not provided', () => {
    const instance: TestConstructor2 = new TestConstructor2();
    expect(instance.teste1.injectedDate).to.exist;
    expect(constructorsArgs.length).to.equal(1);
  });

  it('should not inject a new value as argument on cosntrutor call, when parameter is provided', () => {
    const myDate: Date = new Date(1);
    const instance: TestConstructor = new TestConstructor(myDate);
    expect(instance.injectedDate).to.equals(myDate);
  });


  class Aaaa {}

  class Bbbb {}

  class Cccc {}

  class Dddd {
    constructor(@Inject a: Aaaa, @Inject b: Bbbb, @Inject c: Cccc) {
      constructorsMultipleArgs.push(a);
      constructorsMultipleArgs.push(b);
      constructorsMultipleArgs.push(c);
    }
  }

  it('should inject multiple arguments on construtor call in correct order', () => {
    const instance: Dddd = container.get(Dddd);
    expect(instance).to.exist;
    expect(constructorsMultipleArgs[0]).to.exist;
    expect(constructorsMultipleArgs[1]).to.exist;
    expect(constructorsMultipleArgs[2]).to.exist;
    expect(constructorsMultipleArgs[0].constructor).to.equals(Aaaa);
    expect(constructorsMultipleArgs[1].constructor).to.equals(Bbbb);
    expect(constructorsMultipleArgs[2].constructor).to.equals(Cccc);
  });
});

describe('Default Implementation class', () => {
  class BaseClass {
  }

  class ImplementationClass implements BaseClass {
    @Inject
    testProp: Date;
  }

  it('should inform Container that it is the implementation for its base type', () => {
    container.bind(BaseClass).to(ImplementationClass);
    const instance: ImplementationClass = container.get(BaseClass) as ImplementationClass;
    const test = instance['testProp'];
    expect(test).to.exist;
  });
});

describe('The IoC container.bind(source)', () => {

  class ContainerInjectTest {
    @Inject
    dateProperty: Date;
  }

  container.bind(ContainerInjectTest);

  it('should inject internal fields of non AutoWired classes, if it is requested to the Container', () => {
    const instance: ContainerInjectTest = container.get(ContainerInjectTest);
    expect(instance.dateProperty).to.exist;
  });

  it('should inject internal fields of non AutoWired classes, if it is created by its constructor', () => {
    const instance: ContainerInjectTest = new ContainerInjectTest();
    expect(instance.dateProperty).to.exist;
  });
});

describe('The IoC container.get(source)', () => {

  class ContainerInjectConstructorTest {
    injectedDate: Date;

    constructor(@Inject date: Date) {
      this.injectedDate = date;
    }
  }

  container.bind(ContainerInjectConstructorTest);

  it('should inject internal fields of non AutoWired classes, if it is requested to the Container', () => {
    const instance: ContainerInjectConstructorTest = container.get(ContainerInjectConstructorTest);
    expect(instance.injectedDate).to.exist;
  });
});

describe('The IoC container.getType(source)', () => {

  abstract class ITest {
    abstract testValue: string;
  }

  class Test implements ITest {
    testValue: string = 'success';
  }


  class TestNoProvider {
    testValue: string = 'success';
  }

  class TypeNotRegistered {
    testValue: string = 'success';
  }

  container.bind(ITest).to(Test);
  container.bind(TestNoProvider);

  it('should retrieve type used by the Container', () => {
    const clazz: Function = container.getType(ITest);
    expect(clazz).to.be.equal(Test);

    const clazzNoProvider: Function = container.getType(TestNoProvider);
    expect(clazzNoProvider).to.be.equal(TestNoProvider);
  });

  it('should throw error when the type is not registered in the Container', () => {
    try {
      const clazz: Function = container.getType(TypeNotRegistered);
      assert.fail(clazz, null, `The type TypeNotResistered should not pass the test`);
    } catch (e) {
      expect(e).instanceOf(TypeError);
    }
  });

});

describe('The IoC container.snapshot(source) and container.restore(source)', () => {

  abstract class IService {
  }

  class Service implements IService {
  }

  class MockService implements IService {
  }

  container.bind(IService)
    .to(Service);

  it('should throw TypeError if you try to restore a type which has not been snapshotted', () => {
    expect(function () { container.restore(IService); })
      .to.throw(TypeError, 'Binding for source was never snapshoted.');
  });

  it('should store the existing service and overwrite with new service without scope', () => {

    expect(container.get(IService)).to.instanceof(Service);

    container.snapshot(IService);
    container.bind(IService).to(MockService);

    expect(container.get(IService)).to.instanceof(MockService);
  });

  it('should revert the service to the saved config without scope', () => {

    container.restore(IService);

    expect(container.get(IService)).instanceof(Service);
  });

  it('should store the existing service and overwrite with new service with scope', () => {

    container.bind(IService).to(Service).scope(Scope.Transient);

    expect(container.get(IService)).to.instanceof(Service);

    container.snapshot(IService);
    container.bind(IService).to(MockService).scope(Scope.Transient);

    expect(container.get(IService)).to.instanceof(MockService);
  });

  it('should revert the service to the saved config with scope', () => {

    container.restore(IService);

    expect(container.get(IService)).instanceof(Service);
  });
});

describe('The IoC Container', () => {

  class SingletonInstantiation {
  }

  class ContainerSingletonInstantiation {
  }

  container.bind(ContainerSingletonInstantiation)
    .to(ContainerSingletonInstantiation)
    .scope(Scope.Singleton);

  it('should allow Container instantiation of Singleton classes.', () => {
    const instance: SingletonInstantiation = container.get(SingletonInstantiation);
    expect(instance).to.exist;
  });

  it('should allow scope change to Transient from Singleton.', () => {
    const instance: SingletonInstantiation = container.get(SingletonInstantiation);
    expect(instance).to.exist;
    container.bind(SingletonInstantiation).scope(Scope.Transient);
    const instance2: SingletonInstantiation = new SingletonInstantiation();
    expect(instance2).to.exist;
  });
});

describe('The IoC Container Binding.to()', () => {

  abstract class FirstClass {
    abstract getValue(): string;
  }

  class SecondClass extends FirstClass {
    getValue(): string {
      return 'second';
    }
  }

  class ThirdClass extends FirstClass {
    getValue(): string {
      return 'third';
    }
  }

  container.bind(FirstClass).to(SecondClass);

  it('should allow target overriding', () => {
    let instance: FirstClass = container.get(FirstClass);
    expect(instance.getValue()).to.equal('second');

    container.bind(FirstClass).to(ThirdClass);
    instance = container.get(FirstClass);
    expect(instance.getValue()).to.equal('third');
  });
});
