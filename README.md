# koa-route-decors

### Install

```js
  npm install koa-route-decors
```

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
  const subRouter = await autoRouter(controllerPath); // project root dir recursive all *.controller.ts file example: path.resolve(__dirname, './');
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(8080);
}


user.controller.ts

@Controller('/user') // prefix route path
export class User {
  @Get('/findUser') // if params null default function name
  async findUser(ctx: Context, next: Function) {  // final route path '/user/findUser'
    // ...
  }

  @Post()
  async addUser() {  // '/user/addUser'
    // ...
  }
}

```
