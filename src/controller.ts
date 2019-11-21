import 'reflect-metadata';
import {Constructor} from './interface';
import {PATH_METADATA} from './constants';

export function Controller(path = '') {
  return function (target: Constructor) {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
}
