import Koa from 'koa';
import logger from 'koa-logger';
import route from 'koa-route';
import { run } from '@cycle/run';
import { makeHTMLDriver } from '@cycle/html';

import clientApp from '../client/app';

const ap = new Koa();

ap.use(logger())
  .use(route.get('/', (ctx) => {
    run(clientApp, {
      DOM: makeHTMLDriver((html) => {
        ctx.body = html;
      }),
    });
  }));

export default ap;
