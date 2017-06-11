import Router from 'koa-router';
import request from 'superagent';
import ajaxParamsParse from 'koa-ajax-params';
import { NO_ERROR } from 'contants/error-code';

import { getArticle, getIndex } from '../../modules/article-manager';


const router = new Router({
  prefix: '/api',
});

router
  .use(ajaxParamsParse())
  .use(async (ctx, next) => {
    ctx.set('Content-type', 'application/json');

    await next();
  })
  .get('/get_index', async (ctx, next) => {
    const index = await getIndex();

    ctx.body = JSON.stringify({
      errorCode: NO_ERROR,
      data: index,
    });
  })
  .get('/get_article', async (ctx, next) => {
    const article = await getArticle(ctx.param.get.name);

    ctx.body = JSON.stringify({
      errorCode: NO_ERROR,
      data: article,
    });
  });

export default router;

