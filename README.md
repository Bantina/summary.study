# 项目配置说明

---

**2018-05-08 重要说明，打包测试之前，一定要修改 在 config.js 中 cdn 的地址**

---

## 一些说明：

- src/components 用来存放一些公用的组件，比如公用的 header 、footer...
- src/views 用来存放具体的某个页面，比如 Index 首页， Login 登陆页...
- src/assets 用来存放一些公用的样式文件以及静态资源
- src/utils 用来存放一些工具类库等脚本资源
- static 用来存放静态资源，比如mock数据，测试用视频、音频、图片等资源


## 如何启动

- 开发模式 npm run dev // 比如你当前开发的目录叫做 module1
- 打包构建 npm run build
- 打包构建 npm run test  // 测试的时候打包使用，这样不用每次都给后端一个 index.html
- 语法检测 npm run lint
- 自动修复 npm run fixed // 可以修复大部分错误，但是不要全部依赖这个命令
- 删除打包 npm run clean


## 配置说明

在目录下又一个非常重要的文件 `config.js`，其中内容如下:

```
const { join } = require('path')

module.exports = {
  host: '0.0.0.0',
  port: 8081,

  // 代理服务配置，详见 https://webpack.js.org/configuration/dev-server/#devserver-proxy
  proxy: {},

  // 静态资源存放目录，例如 mock 数据，如初始目录的 data.json 可以通过请求 /mock/data.json 得到
  contentBase: join(__dirname, './static'),

  // 对应 output 的 publicPath，上线之前必须修改的地方
  publicPath: '/',

  // 是否自动打开浏览器
  open: false,

  hot: true,

  // 开发阶段，每次编译结束是否提示
  alwaysNotify: true
}
```
