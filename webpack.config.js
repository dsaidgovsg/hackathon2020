const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
 title: "Hackathon 2020",
 template: "./src/index.html",
 filename: "./index.html"
});

const clientConfig = {
	entry: ['webpack/hot/dev-server', './src/index.js'],
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
					/node_modules/,
					/ai_engine/,
					/docs/
				],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["@babel/preset-env","@babel/preset-react"],
						plugins: ['@babel/plugin-proposal-class-properties']
					}
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
		new webpack.HotModuleReplacementPlugin(),
	],
	resolve: {
		extensions: ['.js','.jsx']
	},
    optimization: {
        minimize: false
    }
};

module.exports = [clientConfig]