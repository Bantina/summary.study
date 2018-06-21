# 项目配置说明

---

[TOC]

---

## 准备工作

> 您可以能第一步要做的事情是：编辑安装 editorconfig 插件

项目中已经`git init`过了，这是为了配合`precommit`的时候进行`eslint`检测，所以不再需要初始化git仓库，直接`add`即可


## 目录结构

```
.
├── README.md
├── config
│   ├── webpack.base.config.js
│   ├── webpack.build.config.js
│   ├── webpack.dev.config.js
│   ├── webpack.loader.config.js
│   └── webpack.test.config.js
├── config.js
├── dist
│   ├── index.html
│   └── libs
│       ├── 0-e759641a.js
│       ├── 1-26e2925d.js
│       ├── 3-c26f02c6.js
│       ├── 4-89c19e14.js
│       ├── app-99c21d8d.css
│       └── manifest-75945e94.js
├── index.html
├── logo.png
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── imgs
│   │   └── styles
│   │       └── base.css
│   ├── components
│   ├── index.js
│   ├── router
│   │   ├── index.js
│   │   └── routes.js
│   ├── store
│   │   └── index.js
│   ├── utils
│   │   └── viewPort.js
│   └── views
│       ├── Index
│       │   └── Index.vue
│       └── Test
│           └── Test.vue
└── static
    └── mock
        └── data.json
```

## 一些说明：

- src/components 用来存放一些公用的组件，比如公用的 header 、footer...
- src/views 用来存放具体的某个页面，比如 Index 首页， Login 登陆页...
- src/common 用来存放一些公用的样式文件和脚本文件以及静态资源
- static 用来存放静态资源，比如mock数据，测试用视频、音频、图片等资源


## 如何启动

- 开发模式 npm run dev
- 打包构建 npm run build  // 上线构建必须使用这个，加上版本号
- 打包构建 npm run test   // 测试的时候使用这个命令
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
  proxy: {
    // 例如 你要访问的跨域地址为 https://www.abc.com/xxx/yyy  和  https://www.abc.com/xxx/bbb
    // 可以进行如下 配置：
    '/xxx': {
      target: "https://www.abc.com",
      changeOrigin: true
    }
    // 那么 axios.get('/api/xxx/yyy')
  },

  // 静态资源存放目录，例如 mock 数据，如初始目录的 data.json 可以通过请求 /mock/data.json 得到
  contentBase: join(__dirname, './static'),

  // 对应 output 的 publicPath
  publicPath: '/',

  // 是否自动打开浏览器
  open: false,

  hot: true,

  // 开发阶段，每次编译结束是否提示
  alwaysNotify: true,
  // 每次打包的时候要确认下 cdn 对应的 项目文件夹名称是否正确，必须！
  cdn: ...
}
```

具体的配置，我已经都加了注释，可以根据需求修改~


## 注意事项

所有的开发依赖请不要随意切换版本，有可能会导致编译不成功，目前使用的`webpack`版本为4，很多东西可能会在短时间内更新，在必要的时候，我会跟进更新。


