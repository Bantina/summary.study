const webpack = require('webpack')
const { join } = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const NotifierPlugin = require('webpack-Notifier')

const nodeEnv = process.env.NODE_ENV || 'development'
const { host, port, open, hot, proxy, contentBase, publicPath, alwaysNotify } = require('../config.js')
const baseConfig = require('./webpack.base.config.js')

console.log(`当前环境变量 ======> ${nodeEnv}`)

function getIp () {
  const os = require('os')
  const interfaces = os.networkInterfaces()

  for (let key in interfaces) {
    const items = interfaces[key]
    for (let i=0; i<items.length; i++) {
      const item = items[i]
      if (item.family === 'IPv4' && !item.internal && item.address !== '127.0.0.1') {
        return item.address
      }
    }
  }

  return false
}

const config = merge(baseConfig, {
  output: {
    filename: '[name].js'
  },
  resolve: {
    alias: {
      vue: join(__dirname, '../node_modules/vue/dist/vue.esm.js') // vue 入口
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`您的项目运行在 http://localhost:${port}`],
        notes: [`您也可以查看您的 电脑ip + 端口号 (http://${getIp()}:${port}) 来访问！`]
      },
      clearConsole: true
    }),
    new NotifierPlugin({
      title: '编译完成...',
      alwaysNotify,
      // contentImage: join(__dirname, '../logo.png')
    })
  ],
  devServer: {
    host,
    port,
    open,
    hot,
    proxy,
    contentBase,
    clientLogLevel: 'none',
    overlay: { warnings: true, errors: true },
    quiet: true,
    progress: true,
    historyApiFallback: {
      index: publicPath + 'index.html'
    }
  }
})

module.exports = config
