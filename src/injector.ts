import 'reflect-metadata';
import {Constructor} from './interface';

export class Injector {
  private readonly providerMap = new Map();
  private readonly instanceMap = new Map();

  setProvider(key: any, value: any) {
    if (!this.providerMap.has(key)) {
      this.providerMap.set(key, value);
    }
  }

  getProvider(key: any) {
    return this.providerMap.get(key);
  }

  setInstance(key: any, value: any) {
    if (!this.instanceMap.has(key)) {
      this.instanceMap.set(key, value);
    }
  }

  getInstance(key: any) {
    return this.instanceMap.get(key);
  }

  inject(target: Constructor, ...args: any[]) {
    const dependencies = args.map(item => {

    });
  }
}
