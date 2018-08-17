const opn = require('opn')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const webpackDevConfig = require('./build/webpack.dev')
const devServerOptions = Object.assign({}, webpackDevConfig.devServer, {
  open: true, // 不知道为啥 node 运行时不起作用
  host: 'localhost',
  port: 3000,
  stats: {
    colors: true,
  },
})

webpackDevServer.addDevServerEntrypoints(webpackDevConfig, devServerOptions)
const compiler = webpack(webpackDevConfig)
const server = new webpackDevServer(compiler, devServerOptions)

server.listen(devServerOptions.port, devServerOptions.host, () => {
  let uri = 'http://' + devServerOptions.host + ':' + devServerOptions.port
  console.log('Starting server on ' + uri)

  opn(uri)
})
