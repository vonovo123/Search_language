const path = require("path");
const Htmlplugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  //확장자 제외
  resolve: {
    extensions: [".js"],
    alias: {
      "~": path.resolve(__dirname, "src"),
      assets: path.resolve(__dirname, "src/assets"),
    },
  },
  //파일 진입점(상대경로)
  entry: "./src/main.js",

  //결과물을 반환하는 설정
  output: {
    // path:path.resolve(__dirname, 'dist'),
    // filename:'main.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: '@import "~/scss/main";',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: ["file-loader"],
      },
    ],
  },
  //번들링 후 결과물의 처리방식등 다양한 플러그인 설정
  plugins: [
    new Htmlplugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "static",
        },
      ],
    }),
  ],
  devServer: {
    host: "localhost",
  },
};
