const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:"http://flycan.ren:8026"
  }
}
