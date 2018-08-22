const path = require('path')
const config = require('../config')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HashOutput = require('webpack-plugin-hash-output')

const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new CleanWebpackPlugin([config.constants.buildRoot], { root: path.resolve(__dirname, '../') }),
    new HashOutput({
      validateOutput: true,
      // Check that md5(assets/main.<hash>.js) === <hash>, but doesn't check fragments/app.html
      validateOutputRegex: /^assets\/.*\.js$/,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash:12].css',
      // chunkFilename: '[name].[contenthash:12].css',
    }),
  ],
  output: {
    publicPath: config.production.assetsDomain,
    filename: '[name].[chunkhash].js',
    // chunkFilename: '[name].[chunkhash].js',
  },
})
