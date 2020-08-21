const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    docs: './src/docs/index.js',
    game: './src/game/index.js'
  },
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml|ttf)$/i,
        use: "file-loader"
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: "./src/docs/index.html",
      chunks: ['docs'],
      excludeChunks: ['game']
    }),
    new HtmlWebpackPlugin({
      title: 'game',
      filename: 'game.html',
      template: "./src/game/game.html",
      chunks: ['game'],
      excludeChunks: ['docs']
    }),
  ]
};
