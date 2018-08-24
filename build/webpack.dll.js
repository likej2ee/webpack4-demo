const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const config = require('../config')
const DLL_OUTPUT = '../' + config.BUILD_DIR
const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  mode: devMode ? 'development' : 'production',
  resolve: {
    modules: [
      // 解决路径问题，可简化 alias entry 的路径配置，是为了告诉webpack在哪些目录下搜寻模块儿
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../' + config.SOURCE_DIR),
    ],
    extensions: ['.js', '.jsx'],
  },
  entry: {
    vendors: ['vue', 'vue-router', 'lodash'],
    // lib: ['lodash'],
    // vue: ['vue', 'vue-router'],
  },
  output: {
    path: path.join(__dirname, DLL_OUTPUT),
    filename: 'dll.[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  plugins: [
    new CleanWebpackPlugin([config.BUILD_DIR], { root: path.resolve(__dirname, '../') }),
    new ManifestPlugin({
      fileName: config.MANIFEST_DLL,
    }),
    new webpack.DllPlugin({
      context: path.join(__dirname, DLL_OUTPUT),
      path: path.join(__dirname, DLL_OUTPUT, 'manifest-[name].json'),
      name: '[name]_[chunkhash]',
    }),
  ],
}
