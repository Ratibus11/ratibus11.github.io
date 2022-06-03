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
	gsap: "3.10.4",
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
			extensions: [".ts", ".js"],
			alias: {
				"@svg": path.resolve(cwd, "assets/img/svg"),
				"@scss": path.resolve(cwd, "src/scss"),
				"@ts": path.resolve(cwd, "src/ts"),
				vue$: path.resolve(
					cwd,
					"libs/vuejs/",
					libsVersions.vuejs,
					"vue.esm-bundler.js"
				),
				gsap$: path.resolve(
					cwd,
					"libs/gsap",
					libsVersions.gsap,
					"gsap.min.js"
				),
			},
		},
		module: {
			rules: [
				{
					test: /\.vue$/i,
					use: [
						{
							loader: "vue-loader",
							options: {
								productionMode: isProduction,
								hotReload: isWatching,
							},
						},
						"vue-svg-inline-loader",
					],
				},
				{
					test: /\.js$/i,
					loader: "babel-loader",
				},
				{
					test: /\.ts$/i,
					loader: "ts-loader",
				},
				{
					test: /\.s[ac]ss$/i,
					use: ["style-loader", "css-loader", "sass-loader"],
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
