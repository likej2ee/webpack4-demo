const pictureRule = require('./rule-picture')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    app: './src/public/index.js',
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '../') }),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath: 'http://static.xxx.com',
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      pictureRule,
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
}
