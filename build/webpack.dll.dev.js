const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const config = require('../config')
const DLL_OUTPUT = '../' + config.constants.buildRoot

module.exports = {
  mode: 'development',
  resolve: {
    modules: [
      // 解决路径问题，可简化 alias entry 的路径配置，是为了告诉webpack在哪些目录下搜寻模块儿
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../' + config.constants.sourceRoot),
    ],
    extensions: ['.js', '.jsx'],
  },
  entry: {
    lib: ['lodash'],
    vue: ['vue', 'vue-router'],
  },
  output: {
    path: path.resolve(__dirname, DLL_OUTPUT),
    filename: 'dll.[name].js',
    library: '[name]_[chunkhash]',
  },
  plugins: [
    new CleanWebpackPlugin([config.constants.buildRoot], { root: path.resolve(__dirname, '../') }),
    new webpack.DllPlugin({
      context: path.resolve(__dirname, DLL_OUTPUT),
      path: path.resolve(__dirname, DLL_OUTPUT, 'manifest-[name].json'),
      name: '[name]_[chunkhash]',
    }),
  ],
}
