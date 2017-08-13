'use strict'

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool:'eval-source-map',
  entry: [
     'webpack-dev-server/client?http://localhost:3000',
     "webpack/hot/only-dev-server",
     "react-hot-loader/patch",
     path.join(_dirname,'app/index.js')
  ], 
  output: {
    path: path.join(_dirname,'/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
    	template: './app/index.tpl.html',
    	inject: 'body',
    	filename: './index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
    new webpack.DefinePlugin({
    	'process.env.NODE_ENV': JSOON.stringify('development')
    })
  ],
  module: {
  	resolve:{
            extensions:['','.js','.json']
        },
  	loaders: [
      {
      	test:/\.js$/,
        exclude:/node_modules/,
        loader:"babe;-loader",
        query:
          {
          	presets:['react','es2015']
          }
      },
      {
      	test:/\.json?$/,
      	loader:'json'
      },
      {
      	test:/\.css$/,
      	loader:"style!css"
      },
      {
      	test:/\.less$/,
      	loader:'style-loader!css-loader!less-loader'
      }
  	]
  }
};
