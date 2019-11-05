import 'reflect-metadata';
import {RequestMethod, ControllerDesc, Constructor} from './interface';
import {METHOD_METADATA, PATH_METADATA} from './constants';

export const controllers: ControllerDesc[] = [];

export function Controller(path = '') {
  return function (target: Constructor): void {
    Reflect.defineMetadata(PATH_METADATA, path, target);
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
