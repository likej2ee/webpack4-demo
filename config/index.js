module.exports = {
  constants: {
    sourceCodeRoot: 'src', // 开发源文件目录
    assetsPath: '/assets/', // 资源访问路径前缀
    webpackPublishRoot: '/dist/assets', // webpack资源构建发布根目录
  },
  production: {
    assetsDomain: 'http://127.0.0.1:3000', // 资源所在位置的域名
  },
  test: {
    assetsDomain: 'http://127.0.0.1:3000',
  },
  dev: {
    assetsDomain: '',
  },
}
