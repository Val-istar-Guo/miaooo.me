import Router from 'koa-router';
import apiRouter from './api';


const router = new Router();

router
  .use(apiRouter.routes());

export default router;
