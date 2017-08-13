'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: [
      path.join(_dirname,"app/final/index.js")
	],
	output:{
		path:path.join(_dirname,'/dist'),
		filename: '[name]-[hash].min.js',
		publicPath: '/'
	},
	plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new HtmlWebpackPlugin({
      	template: './app/index.tpl.html',
      	inject: 'body',
      	filename: './index.html'
      }),

      new webpack.optimize.UglifyJsPlugin({
      	compressor:{
      		warnings:fasle,
      		screw_ie8:true
      	}
      }),
      new webpack.DefinePlugin({
      	'process.env.NODE_ENV':JSON.stringify('production')
      })
	],
	module: {
		loaders: [
		   {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['react','es2015']
                }
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }
		]
	},
	postcss:[
      reuqire('autoprefixer')
	]
};
