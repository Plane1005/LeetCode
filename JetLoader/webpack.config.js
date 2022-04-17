/**
 * mode 环境 development production
 * entry node 下的 path 包，导入入口文件
 * output 打包后的输出文件
 * devtool source-map
 * module rules 对应的 loader
 * plugins 插件
 * devServer 开发服务器
 * **/

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: resolve(__dirname, "src/app.js"),
  output: {
    path: resolve(__dirname, "build"),
    filename: "app.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tpl$/,
        use: [
          {
            loader: "./loaders/jet-tpl",
            options: {
              log: true,
              Uppercase: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "index.html"),
    }),
  ],
  devServer: {
    port: 3333,
  },
};
