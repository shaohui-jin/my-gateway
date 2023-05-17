const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: '/my-gateway/',
  chainWebpack: config => {
    // 移除 preload(预载) 插件
    config.plugins.delete('preload');
    // 移除 prefetch(预取) 插件
    config.plugins.delete('prefetch');
  },
});
