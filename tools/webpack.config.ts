import { Configuration } from "webpack";
import { join } from "path";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const root = process.cwd();
export const config: Configuration = {
  entry: {
    main: join(root, "src/index.tsx")
  },
  output: {
    path: join(root, "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin()
  ],
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".json",
      ".svg",
      ".scss",
      ".less",
      ".css"
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {}
          }
        ]
      }
    ]
  },
  devtool: "source-map",
  mode: "production",
  target: "web",
  optimization: {
    minimize: true
  }
};
export default config;
