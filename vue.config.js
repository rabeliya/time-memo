module.exports = {
  publicPath: "./",
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/sass/prepends.scss";'        
      }
    } 
  },
  configureWebpack: {
    devtool: "source-map"
  }
}