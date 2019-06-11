module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data:
          '@import "~@/assets/styles/_variables";'
      }
    }
  },
  pages: {
    index: {
      entry: 'src/index.js'
    }
  },
  chainWebpack: (config) => {
    config.plugin('html-index').tap((args) => {
      args[0].template = 'src/index.html';
      args[0].filename = 'index.html';
      return args;
    });
  }
};
