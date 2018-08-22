const pictureRule = require('./rule-picture')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('../config')
const utils = require('./utils')
const devMode = process.env.NODE_ENV === 'development'
const DLL_OUTPUT = '../' + config.constants.buildRoot

module.exports = {
  entry: {
    'index/index': './src/public/index.js',
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors',
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, '../' + config.constants.buildRoot),
  },
  resolve: {
    modules: [
      // 解决路径问题，可简化 alias entry 的路径配置，是为了告诉webpack在哪些目录下搜寻模块儿
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../' + config.constants.sourceRoot),
    ],
    extensions: ['.js', '.jsx', '.scss'],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          utils.cssLoaderConfig,
          'postcss-loader',
          utils.scssLoaderConfig,
        ],
      },
      pictureRule,
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'src/public/favicon.ico',
      template: 'src/public/index.html',
      chunks: ['runtime', 'vendors', 'async-vendors', 'index'],
    }),
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, DLL_OUTPUT),
    //   manifest: require(path.resolve(__dirname, DLL_OUTPUT + '/manifest-lib.json')),
    // }),
    // new webpack.DllReferencePlugin({
    //   context: path.resolve(__dirname, DLL_OUTPUT),
    //   manifest: require(path.resolve(__dirname, DLL_OUTPUT + '/manifest-vue.json')),
    // }),
  ],
}
