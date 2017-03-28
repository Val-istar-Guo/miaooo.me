import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

const env = process.env.NODE_ENV;

const clientModuleRules = [
  {
    test: /\.jsx?$/,

    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'react',
          ],

          plugins: ['transform-runtime',{ "polyfill": false }],
        },
      },
    ],
  },
  {
    test: /\.scss$/,
    exclude: /node_modules/,

    use: ExtractTextPlugin.extract({
      fallbackLoader: 'style-loader',

      loader: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]-[hash:base64:5]',
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    }),
  },
  {
    test: /\.scss$/,
    include: /node_modules/,

    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
];

const autoFixExtension = ['.js', '.json', '.jsx'];

// 开发环境配置
const dev = {
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      'src/index.js',
    ],

    lib: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
            // 'superagent',
    ],
  },

  output: {
    path: path.resolve(__dirname, './dist/client'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
    publicPath: '/',
  },

  module: {
    rules: clientModuleRules,
  },

  resolve: {
    extensions: autoFixExtension,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new ProgressBarPlugin({ summary: false }),

    new webpack.optimize.CommonsChunkPlugin({
      names: 'lib',
      filename: '[name].js',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};


// 生产环境-客户端代码编译配置
const client = {
  entry: {
    bundle: 'client',

    lib: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
            // 'superagent',
    ],
  },

  output: {
    path: path.resolve(__dirname, '../dist/client'),

    filename: '[name].[chunkhash:8].js',

    chunkFilename: 'chunk.[name].[chunkhash:8].js',

    publicPath: '/',
  },

  module: {
    rules: clientModuleRules,
  },

  resolve: {
    extensions: autoFixExtension,
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),

    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),

    new webpack.optimize.UglifyJsPlugin({
      mangle: { except: ['$super', '$', 'exports', 'require'] },
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: 'lib',
      filename: '[name].[chunkhash:8].js',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};


/**
 * @desc 获取node_module下所有的模块列表,用于配置webpack.externals，
 *       从而在打包时无需打包这些模块。
 *
 * @return {Object}
 */
function getExternals() {
  return fs.readdirSync(path.resolve(__dirname, './node_modules'))
        // .bin目录保存模块带来的终端命令，并非模块
        .filter(filename => !filename.includes('.bin'))
        // 指定模块为commonjs规范
        .reduce((externals, filename) => {
          externals[filename] = `commonjs ${filename}`;
          return externals;
        }, {});
}

// 生产环境-服务端代码编译配置
const server = {
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

export { dev as devconfig };
export default [client, server];
