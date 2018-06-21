const { join } = require('path')
const isDev = process.env.NODE_ENV === 'development'

// const CDN = [12, 13, 14, 16, 17, 18]

module.exports = {
  host: '0.0.0.0',
  port: 8081,
  // 代理服务配置，详见 https://webpack.js.org/configuration/dev-server/#devserver-proxy
  proxy: {
    '/LiveExam': {
      target: 'http://live.xueersi.com/science/',
      changeOrigin: true
    }
  },
  // 静态资源存放目录，例如 mock 数据，如初始目录的 data.json 可以通过请求 /mock/data.json 得到
  contentBase: join(__dirname, './static'),
  // 对应 output 的 publicPath
  publicPath: isDev ? '/' : '//res17.xesimg.com（对应域）/KeJian（下面的某个文件夹）/XiaoXue（下面的某个子目录等...）/',
  // 是否自动打开浏览器
  open: false,
  hot: true,
  // 开发阶段，每次编译结束是否提示
  alwaysNotify: false
}
