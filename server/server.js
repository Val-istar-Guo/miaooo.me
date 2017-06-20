import path from 'path';

import Koa from 'koa';
import csp from 'koa-csp';
import views from 'koa-views';
import logger from 'koa-logger';

// middleware config
import * as config from './config';
import router from './routes';


const server = new Koa();

server
  .use(logger())
  .use(csp(config.csp))
  .use(views(path.resolve(__dirname, '../views'), { map: { html: 'ejs' } }))
  .use(router.routes());

export default server;
