module.exports = {
  SOURCE_DIR: 'src', // 开发源文件目录
  BUILD_DIR: 'dist', // 构建发布目录
  MANIFEST_DLL: 'manifest-dll.json', // dll hash映射文件

  production: {
    publicPath: '', // 资源所在位置的域名
  },
  test: {
    publicPath: 'http://127.0.0.1:3000/',
  },
  development: {
    publicPath: 'http://127.0.0.1:3000/',
  },

  // 获取当前环境对应的资源域名
  getPublicPath(nodeEnv) {
    return this[nodeEnv].publicPath
  },
}
