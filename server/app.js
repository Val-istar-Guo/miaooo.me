import path from 'path';
import Koa from 'koa';
import logger from 'koa-logger';
import views from 'koa-views';
import Router from 'koa-router';
import xs from 'xstream';
import { run } from '@cycle/run';
import { makeHTMLDriver } from '@cycle/html';

// import clientApp from '../client/app';

const ap = new Koa();

// function getServerRenderHtml() {
//   return new Promise((resolve) => {
//     const dispose = run(clientApp, {
//       DOM: makeHTMLDriver((html) => {
//         dispose();
//         resolve(html);
//       }),
//       HOT: () => (
//         xs.create({
//           start(listener) {
//             this.id = setInterval(() => {
//               this.num += 1;
//               listener.next(`num: ${this.num}`);
//             }, 1000);
//           },
//           stop() {
//             clearInterval(this.id);
//           },
//           id: 0,
//           num: 0,
//         })),
//     });
//   });
// }

const router = new Router();
router.get('/', async (ctx) => {
  // const html = await getServerRenderHtml();
  await ctx.render('index.dev.html', { app: '' });
});

ap.use(views(path.resolve(__dirname, '../views'), { map: { html: 'ejs' } }))
  .use(logger())
  .use(router.routes());

export default ap;
