import fs from 'fs';
import path from 'path';
import convert from 'koa-convert';
import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';

import app from './app';
import webpackCfg from '../build/webpack.config.dev';

const compiler = webpack(webpackCfg);

/**
 * Webpack hook event to write html file
 * into `/views/dev` from `/views/tpl`
 * due to server render
 */
compiler.plugin('emit', (compilation, callback) => {
  const assets = compilation.assets;
  let file;
  let data;

  Object.keys(assets).forEach((key) => {
    if (key.match(/\.html$/)) {
      file = path.resolve(__dirname, key);
      data = assets[key].source();
      fs.writeFileSync(file, data);
    }
  });
  callback();
});

app.use(async (ctx, next) => {
  if (ctx.serverRenderHtml) {
    await ctx.render('index.dev.html', { app: ctx.serverRenderHtml });
  } else {
    await next();
  }
});
app.use(convert(devMiddleware(compiler, {
  publicPath: webpackCfg.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
  },
})));
app.use(convert(hotMiddleware(compiler)));
app.listen(8080);
