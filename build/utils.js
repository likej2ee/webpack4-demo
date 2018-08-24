const path = require('path')
const config = require('../config')
const INCLUDE_PATHS = path.resolve(__dirname, './' + config.SOURCE_DIR + '/core')
const devMode = process.env.NODE_ENV === 'development'
const OUT_PUT_STYLE = devMode ? 'nested' : 'compressed'

// css-loader
exports.cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    minimize: true,
    sourceMap: devMode,
  },
}

// scss-loader
exports.scssLoaderConfig = {
  loader: 'sass-loader',
  options: {
    outputStyle: OUT_PUT_STYLE,
    includePaths: [INCLUDE_PATHS],
    sourceMap: devMode,
  },
}
