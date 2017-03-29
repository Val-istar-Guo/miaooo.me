import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  entry: {
    bundle: 'client',

    lib: [
      'xstream',
      '@cycle/run',
      '@cycle/dom',
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
    rules: [
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

              plugins: ['transform-runtime', { polyfill: false }],
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
    ],
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
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
