var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var precss = require('precss');
var postcssUrl = require('postcss-url');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');

module.exports = {
  entry: ['babel-polyfill', './app/main.jsx'],
  output: {
    path: './app',
    filename: 'index.js'
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".scss", ".css"],
    root: path.resolve(__dirname)
  },
  devServer: {
    inline: true,
    port: 3333,
    historyApiFallback: true,
    progress: true,
    hot: true,
    stats: 'errors-only'
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: 'babel',
      }, {
        test: /\.scss|\.css$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
        exclude: /node_modules/,
      }, {
       test: /\.(png|jpg)$/,
       loader: 'url-loader?limit=80000',
       include: __dirname + '/app/assets',
      }
    ]
  },

  postcss: function (webpack) {
    return [autoprefixer, precss, postcssImport({ addDependencyTo: webpack }), postcssUrl({})]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.html",
      inject: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
