var webpack = require('webpack');
var path = require("path");

module.exports = {
    entry: './view/js/index.js',
    output: {
        path: path.join(__dirname, 'view/dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            include: [
                path.resolve(__dirname, 'view')
            ],
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },

    devtool: "source-map"

};
