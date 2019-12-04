import 'reflect-metadata';
import {METHOD_METADATA, PATH_METADATA} from './constants';
import * as Router from 'koa-router';
import {Constructor} from './interface';
import {Utils} from './utils';
import {rootInjector} from './injector';

export function initRouter(controller: Constructor) {
  const router = new Router();
  const routes = mapRoute(controller);
  for (const item of routes) {
    const {url, method, handle} = item;
    switch (method) {
      case 'get':
        router.get(url, handle);
        break;
      case 'post':
        router.post(url, handle);
        break;
      case 'put':
        router.put(url, handle);
        break;
      case 'delete':
        router.delete(url, handle);
        break;
      case 'options':
        router.options(url, handle);
        break;
      case 'patch':
        router.patch(url, handle);
        break;
    }
  }
  return router;
}

export async function autoRouter(rootDir: string) {
  const router = new Router();
  const reg = /.+controller.[tj]s$/;
  const files = await Utils.getFile(rootDir);
  const controllers = files.filter(item => reg.test(item)).map(item => require(item));
  for (const controller of controllers) {
    const keys = Object.keys(controller);
    const controllerClass = keys.map(item => {
      if (
        Utils.isFunction(controller[item])
        && controller[item] === controller[item].prototype.constructor
        && typeof Reflect.getMetadata(PATH_METADATA, controller[item]) === 'string'
      ) {
        return controller[item];
      } else {
        return false;
      }
    }).filter(item => item);
    controllerClass.forEach(item => {
      const subRouter = initRouter(item);
      router.use(subRouter.routes());
    });
  }
  return router;

}

function mapRoute(controller: Constructor) {
  const instance = rootInjector.factory(controller);
  const prototype = Object.getPrototypeOf(instance);
  const methodNames = Object.getOwnPropertyNames(prototype).filter(item => !(prototype[item] === prototype.constructor) && Utils.isFunction(prototype[item]));
  return methodNames.map(methodName => {
    const handle = prototype[methodName];
    const prefix = Reflect.getMetadata(PATH_METADATA, controller);
    const method = Reflect.getMetadata(METHOD_METADATA, handle);
    let url = Reflect.getMetadata(PATH_METADATA, handle);
    url = url ? url : `/${methodName}`;
    url = prefix + url;
    return {url, method, handle: handle.bind(instance), methodName};
  });
}
