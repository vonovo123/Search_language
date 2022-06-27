// 웹팩에 대한 설정
const path = require("path");
// path method
module.exports = {
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js"],
  },
  entry: {
    app: path.join(__dirname, "index.js"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
    publicPath: "/dist",
  },
};
