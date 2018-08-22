const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const config = require('../config')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, config.constants.buildRoot),
    compress: true,
    hot: true,
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    publicPath: '',
    filename: '[name].[hash].js',
    // chunkFilename: '[name].[hash].js',
  },
})
