import 'reflect-metadata';
import {RequestMethod, Constructor} from './interface';
import {METHOD_METADATA, PATH_METADATA} from './constants';
import {rootInjector, Injectable} from './injectable';
import {Injector} from './injector';

export function Controller(path = '') {
  return function (target: Constructor): void {
    Reflect.defineMetadata(PATH_METADATA, path, target);
    const paramTypes = Reflect.getMetadata('design:paramtypes', target);
    const injector: Injector = rootInjector;
    for (const item of paramTypes) {
      const instance = injector.getInstance(item);
      if (!instance) {
        const provider = injector.getProvider(item);
        if (!provider) {
          // throw new Error(`can't find provider ${item.name}`);
        } else {
          injector.setInstance(item, new item());
        }
      }
    }
  };
}

export const Get = createDecorator('get');
export const Post = createDecorator('post');
export const Put = createDecorator('put');
export const Delete = createDecorator('delete');
export const Options = createDecorator('options');
export const Patch = createDecorator('patch');

function createDecorator(method: RequestMethod) {
  return (path = '') => (target: {[key: string]: any}, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
  };
}
