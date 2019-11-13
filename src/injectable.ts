import {Injector} from './injector';
import {Constructor} from './interface';

export const rootInjector = new Injector();

export function Injectable() {
  return function (target: Constructor) {
    rootInjector.setProvider(target, target);
  };
}
