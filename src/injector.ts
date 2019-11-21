import 'reflect-metadata';
import {Constructor} from './interface';
import {Utils} from './utils';

class Injector {

  static injector: Injector;
  private readonly providerMap = new Map();

  private constructor() {}

  static getInstance() {
    if (!Injector.injector) {
      Injector.injector = new Injector();
    }
    return Injector.injector;
  }

  inject(target: Constructor) {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
    if (this.providerMap.has(target)) return;
    for (const p of paramTypes) {
      if (p === target) {
        throw new Error('can not depend self');
      } else if (!this.providerMap.has(p)) {
        throw new Error('dependency is not register');
      }
    }
    this.providerMap.set(target, target);
  }

  factory(target: Constructor) {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
    const dependencies = paramTypes.map((item: Constructor) => {
      if (!this.providerMap.has(item)) {
        throw new Error('dependency is not register');
      } else if (item.length) {
        return this.factory(item);
      } else {
        return new item();
      }
    });
    return new target(...dependencies);
  }
}

const rootInjector = Injector.getInstance();
export {rootInjector};
