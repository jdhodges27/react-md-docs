'use strict';
/*eslint-env node*/
const webpack = require('webpack'); //eslint-disable-line no-unused-vars
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildFolder = path.resolve(__dirname, '../src/www');
const js = path.resolve(__dirname, '../src/app/js');
const nodeModules = path.resolve(__dirname, '../node_modules');
const reactmd = nodeModules + '/react-md';

// Change to your context
const publicPath = 'react-md';

module.exports = {
  __buildFolder: buildFolder,
  __publicPath: publicPath,

  entry: [
    'babel-polyfill',
    `${js}/index.jsx`,
  ],

  eslint: {
    configFile: './.eslintrc',
  },

  module: {
    // This version of eslint is broken right now.
    //preLoaders: [{
    //  test: /\.jsx?$/,
    //  loader: 'eslint',
    //  exclude: /node_modules|react-md\/lib/,
    //}],

    loaders: [{
      test: /\.(png|jpe?g|ico)$/,
      exclude: /node_modules/,
      loader: 'file?name=imgs/[name].[ext]',
    }, {
      test: /\.md/,
      exclude: /node_modules/,
      loader: 'raw',
    }],
  },

  modulesDirectories: [
    nodeModules,
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: {
      // prevents multiple react versions when linked
      'react': nodeModules + '/react',
      'react-dom': nodeModules + '/react-dom',
      'helpers': reactmd + '/src/scss/helpers/_all.scss',
      'md-scss': reactmd + '/src/scss/react-md.scss',
      'md-src': reactmd + '/src/scss',
    },
  },

  output: {
    path: buildFolder,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/app/index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      'process.env.APP_URI_BASE': `'/${publicPath}'`,
    }),
  ],

  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 version', 'ie >= 10']})];
  },
};
