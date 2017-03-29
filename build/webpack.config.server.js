import path from 'path';
import fs from 'fs';

/**
 * @desc 获取node_module下所有的模块列表,用于配置webpack.externals，
 *       从而在打包时无需打包这些模块。
 *
 * @return {Object}
 */
function getExternals() {
  /* eslint-disable no-param-reassign */
  return fs.readdirSync(path.resolve(__dirname, './node_modules'))
        // .bin目录保存模块带来的终端命令，并非模块
        .filter(filename => !filename.includes('.bin'))
        // 指定模块为commonjs规范
        .reduce((externals, filename) => {
          externals[filename] = `commonjs ${filename}`;
          return externals;
        }, {});
  /* eslint-enable no-param-reassign */
}

export default {
  entry: 'server/',
  target: 'node',
  externals: getExternals(),

  node: {
    __filename: false,
    __dirname: false,
  },

  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,

        use: [{
          loader: 'babel-loader',

          options: {
            presets: [
                            ['es2015', { modules: false }],
              'react',
            ],
          },
        }],
      },
    ],
  },

  resolve: {
    extensions: autoFixExtension,
  },
};
