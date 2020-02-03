const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
	title: "Hackathon 2020",
	template: "./src/index.html",
	filename: "./index.html"
});

const clientConfig = {
	entry: ['./src/index.js'],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		pathinfo: false,
	},
	module: {
		noParse: /jquery|lodash/,
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [
				  path.resolve(__dirname, 'src'),
				],				
				exclude: [
					/node_modules/
				],
				use: {
					loader: 'babel-loader',
					options: {
						// ignore any .babelrc files, use what is defined below instead
						babelrc: false,
						// Babel preset for ES6+ and React
						presets: ["@babel/preset-env","@babel/preset-react"],
						plugins: ['@babel/plugin-proposal-class-properties'],
						// use node_modules/.cache/babel-loader to cache the results of the loader
						cacheDirectory: true,
					},
				}
			}, 
			{
				test: /\.(s*)css$/,
				use: ['style-loader','css-loader'],			
			}
		]
	},
	plugins:[
		htmlPlugin,
	],
	resolve: {
		extensions: ['.js','.jsx']
	},
    optimization: {
        minimize: false
    }
};

module.exports = [clientConfig]