// Webpack plugins
// HTML
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Vue.js
const { VueLoaderPlugin } = require("vue-loader");

// Utils
const path = require("path");
const webpack = require("webpack");

const cwd = path.resolve(__dirname);
const libsVersions = {
	vuejs: "3.2.36",
	jquery: "3.6.0",
};

module.exports = (env, argv) => {
	const isProduction = argv.mode === "production";
	const isWatching = argv.watch;

	return {
		mode: isProduction ? "production" : "development",
		entry: `${cwd}/src/main.js`,
		output: {
			path: cwd,
			filename: "app.js",
		},
		optimization: {
			minimize: isProduction,
		},
		resolve: {
			extensions: [".ts", ".js", ".json"],
			alias: {
				"@svg": path.resolve(cwd, "assets/img/svg"),
				"@ts": path.resolve(cwd, "src/ts"),
				vue$: path.resolve(
					cwd,
					"libs/vuejs/",
					libsVersions.vuejs,
					"vue.esm-bundler.js"
				),
				jquery$: path.resolve(
					cwd,
					"libs/jquery",
					libsVersions.jquery,
					isProduction ? "jquery.prod.js" : "jquery.dev.js"
				),
			},
		},
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: "vue-loader",
					options: {
						productionMode: isProduction,
						hotReload: isWatching,
					},
				},
				{
					test: /\.js$/,
					loader: "babel-loader",
				},
				{
					test: /\.ts$/,
					loader: "ts-loader",
				},
				{
					test: /\.s[ac]ss$/i,
					use: ["style-loader", "css-loader", "sass-loader"],
				},
				{
					test: /\.(svg)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								emitFile: false,
								publicPath: (url, resourcePath, context) => {
									return path.relative(cwd, resourcePath);
								},
							},
						},
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: "Ratibus11 - GitHub Pages",
				template: path.resolve(cwd, "src/index_template.html"),
			}),
			new VueLoaderPlugin(),
			new webpack.DefinePlugin({
				__VUE_OPTIONS_API__: false,
				__VUE_PROD_DEVTOOLS__: false,
			}),
		],
	};
};
