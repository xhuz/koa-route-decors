export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'options' | 'patch';

export interface Constructor {
  new (): any;
  [key: string]: any;
}
