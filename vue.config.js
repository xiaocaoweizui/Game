const { defineConfig } = require('@vue/cli-service')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

//定义这个主要是有智能提示信息
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:false,
  devServer:{
    proxy: 'http://localhost:3000',
    port:3001
  },
  //解决在vue文件中的js代码，在谷歌浏览器中F12找不到的问题
  configureWebpack: {
    devtool: 'source-map' // 或 'eval-source-map'
  },
  chainWebpack: config => {
    config.devtool('source-map');
  }
})


