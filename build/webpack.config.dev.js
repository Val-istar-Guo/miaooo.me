import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// import ProgressBarPlugin from 'progress-bar-webpack-plugin';

export default {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      './client',
    ],

    lib: [
      'xstream',
      '@cycle/run',
      '@cycle/dom',
            // 'superagent',
    ],
  },

  output: {
    path: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', { modules: false }]],
              plugins: [['transform-runtime', { polyfill: false }]],
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new ProgressBarPlugin({ summary: false }),

    new webpack.optimize.CommonsChunkPlugin({
      names: 'lib',
      filename: '[name].js',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
