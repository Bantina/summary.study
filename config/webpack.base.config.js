const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join } = require('path')
const baseLoaders = require('./libs/static.loader.js')
const { publicPath } = require('../config.js')

const nodeEnv = process.env.NODE_ENV || 'production'

const config = {
  devtool: '#cheap-module-source-map',
  mode: nodeEnv,
  target: 'web',
  entry: {
    app: join(__dirname, '../src/', 'index.js')
  },
  output: {
    path: join(__dirname, '../dist'),
    publicPath
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre', // 可选 pre 和 post 代表在处理对应类型文件之前和之后
        include: [join(__dirname, '../src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          join(__dirname, '../src')
        ],
        exclude: /(node_modules)/
      },
      ...baseLoaders()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: join(__dirname, '../index.html')
    })
  ]
}

module.exports = config
