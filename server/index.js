import server from './server';
import staticServe from 'koa-static';

server.use(staticServe('client'))
  .listen(8080, '0.0.0.0');
