require('dotenv').config();
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
  return {
    entry: ['./src/client/src'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: 'bundle.js'
    },
    plugins: [
      new CopyWebpackPlugin([{ from: './public/favicon.png' }]),
      new webpack.EnvironmentPlugin({
        SERVER_URL: process.env.SERVER_URL
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: {
            loader: 'graphql-tag/loader'
          }
        }
      ]
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      contentBase: path.resolve(__dirname, 'public'),
      port: 8080,
      proxy: {
        '/api': {
          target: `${process.env.SERVER_URL}`
        }
      }
    }
  };
};
