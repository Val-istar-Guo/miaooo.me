import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

const extractSCSS = new ExtractTextPlugin('styles/[name]-style.css');
const extractCSS = new ExtractTextPlugin('styles/lib.css');

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
      '@cycle/isolate',
      '@cycle/http',
      '@cycle/history',
    ],
  },

  output: {
    path: path.resolve(__dirname, '../dist/client'),
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
              plugins: [
                ['transform-runtime', { polyfill: false }],
                ['transform-object-rest-spread'],
              ],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,

        use: extractSCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              // options: {
              //   modules: true,
              //   localIdentName: '[name]__[local]-[hash:base64:5]',
              // },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        // use: ['style-loader', 'css-loader'],
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    extractSCSS,
    extractCSS,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({ summary: false }),

    new webpack.optimize.CommonsChunkPlugin({
      names: 'lib',
      filename: '[name].js',
    }),

    new HtmlWebpackPlugin({
      filename: '../views/index.dev.html',
      template: './views/index.html',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
