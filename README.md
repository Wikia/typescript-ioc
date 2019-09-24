[![Build Status](https://travis-ci.org/Bielik20/jenkins-rxjs.svg?branch=master)](https://travis-ci.org/Bielik20/jenkins-rxjs)
[![Known Vulnerabilities](https://snyk.io/test/github/Wikia/dependency-injection-js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Bielik20/typescript-ioc?targetFile=package.json)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Coverage Status](https://coveralls.io/repos/github/Wikia/dependency-injection-js/badge.svg?branch=master)](https://coveralls.io/github/Bielik20/typescript-ioc?branch=master)

# IoC Container for Typescript and Javascript

This is a lightweight (weights around 14 KB, where `reflect-metadata` takes almost 10 KB) dependency injection container for typescript and javascript. 
It was created so that it can be used in mixed projects (lib in ts and app in js). 
It is designed to be used on browser but can be used on node.js server as well.

It was inspired by:
- [InversifyJS](https://github.com/inversify/InversifyJS) - it was too big, weighting over 50 KB.
- [typescript-ioc](https://github.com/thiagobustamante/typescript-ioc) - it didn't work well on browser and we didn't agree with the best practices proposed by it. 

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [A note about classes and interfaces](#a-note-about-classes-and-interfaces)
- [Restrictions](#restrictions)

## Installation

This library only works with typescript. Ensure it is installed:

```bash
npm install typescript -g
```

To install dependency-injection-js:

```bash
npm install git+https://github.com/Wikia/dependency-injection-js.git
```

## Configuration

To use decorators enable compilation options in your tsconfig.json file:

```typescript
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Usage

Please refer to e2e spec for examples of usage.

The most basic usage is:

```typescript
@Injectable()
class DependencyClass {
  name = 'implementation dependency';
}

@Injectable()
class MasterClass {
  name = 'implementation master';

  constructor(public dep: DependencyClass) {}
}

// should be created only once
const container = new Container();

const instance = container.get(MasterClass);
```

## A note about classes and interfaces

Typescript interfaces only exist at development time, to ensure type checking. When compiled, they do not generate runtime code.
This ensures good performance, but also means that is not possible to use interfaces as the type of a property being injected.
There is no runtime information that could allow any reflection on interface type. Take a look at https://github.com/Microsoft/TypeScript/issues/3628 for more information about this.

So:

```typescript
const container = new Container();

interface IPersonDAO {
  get(id: string): Person;
}

abstract class PersonDAO implements IPersonDAO {
  get(id: string): Person;
}

class PersonDAOImpl implements IPersonDAO {
  get(id: string): Person
  {
      // get the person and return it...
  }
}

// NOT SUPPORTED
container.bind(IPersonDAO).to(PersonDAOImpl);

// SUPPORTED
container.bind(PersonDAO).to(PersonDAOImpl);

```

## Restrictions
- Circular injections are not supported.
- You can only inject types that are already defined into your file.
