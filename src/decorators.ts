import {RequestMethod, ControllerDesc, Constructor} from './interface';

export const controllers: ControllerDesc[] = [];

export function Controller(path = '') {
  return function (target: Constructor) {
    target.prefix = path;
  };
}

export const Get = createDecorator('get');
export const Post = createDecorator('post');
export const Put = createDecorator('put');
export const Delete = createDecorator('delete');
export const Options = createDecorator('options');
export const Patch = createDecorator('patch');

function createDecorator(method: RequestMethod) {
  const factory = (url = '') => {
    return function (target: Constructor, name: string) {
      url = url || `/${name}`;
      const item = {
        url,
        method,
        handle: target[name],
        constructor: target.constructor
      };

      controllers.push(item);
    };
  };

  return factory;
}
