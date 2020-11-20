const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack');

const PATHS = {
  build: path.join(__dirname, './build')
};

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: PATHS.build,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(eot|svg)$/,
        use: [{
          loader: 'file-loader', options: { esModule: false }
        }]
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'file-loader'
        }]
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      disable: process.env.NODE_ENV === 'development',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new Dotenv()
  ],
}
