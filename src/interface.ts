export type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'options' | 'patch';

export interface ControllerDesc {
  url: string;
  method: RequestMethod;
  handle: () => Promise<any>;
  constructor: Constructor;
}
export interface Constructor {
  new (): any;
  [key: string]: any;
}
