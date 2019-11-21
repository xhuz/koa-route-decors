import 'reflect-metadata';
import {RequestMethod} from './interface';
import {METHOD_METADATA, PATH_METADATA} from './constants';

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
