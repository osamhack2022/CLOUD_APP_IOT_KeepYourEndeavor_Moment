const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/": {
        target: "https://api-server.run.goorm.io/",
        pathRewrite: { "^/": "" },
        ws: false,
      },
    },
  },
});