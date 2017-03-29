import convert from 'koa-convert';
import webpack from 'webpack';
import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';

import app from './app';
import webpackCfg from '../build/webpack.config.dev';

const compiler = webpack(webpackCfg);

app.use(convert(devMiddleware(compiler, {
  publicPath: webpackCfg.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
  },
})));
app.use(convert(hotMiddleware(compiler)));
app.listen(8080);
