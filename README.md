# koa-route-decors

### Install

```js
  npm install koa-route-decors
```

### Developing

* dependency injection

### Update

* 1.02
fix 'this' in routing method




### Api

decorators

* @Controller
* @Get
* @Post
* @Put
* @Delete
* @Options
* @Patch

init Router Function

* initRouter
* autoRouter

### Usage

```js

app.ts

// Manual router
import * as Koa from 'koa';
import {initRouter} from 'koa-route-decors';
import {User} from './controller/user';

const app = new Koa();

const router = new Router();

const subRouter = initRouter(User);

router.use(subRouter);
// ...

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080);


// Auto router

// ...

import {autoRouter} from 'koa-route-decors';

start();

async function start() {
  const app = new Koa();
  const router = new Router();
  const subRouter = await autoRouter(controllerPath); // recursive all *.controller.ts in Given path example: path.resolve(__dirname, './');
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(8080);
}


user.controller.ts

/**
 * @decorator
 * @params {string} path - route prefix
*/
@Controller('/user')
export class User {
  /**
   * @decorator
   * @params {string} path - route path, default method name 'findUser'
  */
  @Get('/findUser')
  async findUser(ctx: Context, next: Function) {  // final route path '/user/findUser'
    // ...
  }

  @Post()
  async addUser() {  // '/user/addUser'
    // ...
  }
}

```
