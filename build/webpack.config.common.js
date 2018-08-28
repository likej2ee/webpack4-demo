const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlImportDllPlugin = require('./html-import-dll-plugin')

const config = require('../config')
const loaders = require('./loaders')
const NODE_ENV = process.env.NODE_ENV
const devMode = NODE_ENV === 'development'
const BUILD_PATH = '../' + config.BUILD_DIR

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
      },
    },
  },
  output: {
    publicPath: config.getPublicPath(NODE_ENV),
    path: path.join(__dirname, BUILD_PATH),
  },
  resolve: {
    modules: [
      // 解决路径问题，可简化 alias entry 的路径配置，是为了告诉webpack在哪些目录下搜寻模块儿
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../' + config.SOURCE_DIR),
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
          loaders.cssLoader,
          'postcss-loader',
          loaders.scssLoader,
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [loaders.urlLoader, loaders.ImageWebpackLoader],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: NODE_ENV === 'development' ? true : false,
      __TEST__: NODE_ENV === 'test' ? true : false,
      __PRODUCTION__: NODE_ENV === 'production' ? true : false,
    }),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'src/public/favicon.ico',
      template: 'src/public/index.html',
      chunks: ['runtime', 'vendors', 'index/index'],
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),
    new HtmlImportDllPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname, BUILD_PATH),
    //   manifest: require(path.join(__dirname, BUILD_PATH + '/manifest-lib.json')),
    // }),
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname, BUILD_PATH),
    //   manifest: require(path.join(__dirname, BUILD_PATH + '/manifest-vue.json')),
    // }),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, BUILD_PATH),
      manifest: require(path.join(__dirname, BUILD_PATH + '/manifest-vendors.json')),
    }),
  ],
}
