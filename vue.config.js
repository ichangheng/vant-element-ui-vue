const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:"你要请求的网址"
  }
}
