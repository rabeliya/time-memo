module.exports = {
  publicPath: "./",
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      scss: {
        // prependData: '@import "./src/assets/sass/prepends.scss";'
      }
    } 
  },
  configureWebpack: {
    devtool: "source-map"
  }
}