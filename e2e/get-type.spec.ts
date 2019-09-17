import { Container, Injectable } from '../src';

@Injectable()
class MasterClass {
  name = 'original master';
}

@Injectable()
class MasterClassImpl implements MasterClass {
  name = 'implementation master';
}

describe('get type', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  it('should get default type', () => {
    const klass = container.getType(MasterClass);

    expect(klass).toBe(MasterClass);
  });

  it('should get bound type', () => {
    container.bind(MasterClass).to(MasterClassImpl);

    const klass = container.getType(MasterClass);

    expect(klass).toBe(MasterClassImpl);
  });
});
