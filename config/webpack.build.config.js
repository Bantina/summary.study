const webpack = require('webpack')
const { join } = require('path')
const merge = require('webpack-merge')
const NotifierPlugin = require('webpack-Notifier')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'
const baseConfig = require('./webpack.base.config.js')

console.log(`当前环境变量 ======> ${nodeEnv}`)

const config = merge(baseConfig, {
  devtool: false,
  output: {
    filename: 'libs/[name]-[chunkhash:8].js',
    chunkFilename:'libs/[id]-[chunkhash:8].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: 10,
          enforce: true
        },
        commons: {
          test: /common\/|components\//,
          name: 'commons',
          priority: 10,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'libs/[name]-[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    }),
    new NotifierPlugin({
      title: '编译完成...',
      // contentImage: join(__dirname, '../logo.png')
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
})

module.exports = config
