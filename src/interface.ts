export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'options' | 'patch';

export interface Constructor {
  new (...args: any[]): any;
  [key: string]: any;
}
