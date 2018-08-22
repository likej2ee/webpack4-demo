module.exports = {
  constants: {
    sourceRoot: 'src', // 开发源文件目录
    buildRoot: 'dist', // 构建发布目录
  },
  production: {
    assetsDomain: '', // 资源所在位置的域名
  },
  test: {
    assetsDomain: 'http://127.0.0.1:3000',
  },
  dev: {
    assetsDomain: '',
  },
}
