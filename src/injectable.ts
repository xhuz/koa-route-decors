import {rootInjector} from './injector';

export function Injectable() {
  return function (target: any) {
    rootInjector.inject(target);
  };
}
