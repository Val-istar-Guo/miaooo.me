import path from 'path';
import Koa from 'koa';
import logger from 'koa-logger';
import views from 'koa-views';
import Router from 'koa-router';
import { run } from '@cycle/run';
import { makeHTMLDriver } from '@cycle/html';

import clientApp from '../client/app';

const ap = new Koa();

function getServerRenderHtml() {
  return new Promise((resolve) => {
    run(clientApp, {
      DOM: makeHTMLDriver((html) => {
        resolve(html);
      }),
    });
  });
}

const router = new Router();
router.get('/', async (ctx, next) => {
  ctx.serverRenderHtml = await getServerRenderHtml();
  await next();
});

ap.use(views(path.resolve(__dirname, '../views'), { map: { html: 'ejs' } }))
  .use(logger())
  .use(router.routes());

export default ap;
