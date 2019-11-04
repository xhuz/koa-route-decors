import {controllers} from './decorators';
import * as Router from 'koa-router';

export const router = new Router();

for (const item of controllers) {
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
