/**
 * config.js v1.1.0
 * 2020-06-02
 */
import _ from "lodash";
import path from "path";
import minimist from "minimist";


const options = minimist(process.argv.slice(2));
const mode = options.mode || "dev";

let config = {
	isDev: mode == "dev",
	mode: mode,
	src: "./src/",
	dest: "./htdocs/",
  dist: "./dist/",
}

if(options.dist){
  config.dest = config.dist;
}

// htmlData: HtmlWebpackPluginデータ
// config.htmlData = {
// 	dev: {
// 		title: "開発版",
// 		path: ".",
// 		ogurl: "http://1-10.dev"
// 	},
// 	stg: {
// 		title: "ステージング版",
// 		path: "http://1-10.stg",
// 		ogurl: "http://1-10.stg"
// 	},
// 	prd: {
// 		title: "製品版",
// 		path: "http://1-10.prd",
// 		ogurl: "http://1-10.prd"
// 	}
// }


// webpack
import webpack from "webpack";
import ConcatPlugin from "webpack-concat-plugin";
import TerserPlugin from "terser-webpack-plugin";
// import HtmlWebpackPlugin from "html-webpack-plugin";

config.webpack = {
	src: [
    `${config.src}assets/js/**/*.js`,
		// `${config.src}html/**/*.html`
	],
	dest: `${config.dest}assets/js/`,
	config: {
		mode: config.isDev ? "development" : "production",
		// entry: entries, // entryポイントが複数の場合
		entry: {
			"common.js": `${config.src}assets/js/common/index.js`
		} ,
		output: {
			filename: "[name]"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [{
						loader: "babel-loader",
						options: {
							presets: [
								["@babel/preset-env", {
                  useBuiltIns: "usage", // or "entry"
                  corejs: 3,
                }]
							]
						}
					}],
					exclude: /node_modules/,
				},
        // {
        //   test: /\.js$/,
        //   loader: "string-replace-loader",
        //   options: {
        //     search: '\$/api/',
        //     replace: 'https://',
        //   }
        // }
			]
		},
		devtool: "source-map",
    resolve: {
  		extensions: [".js"],
      alias: {
        "@js": path.resolve(__dirname, `../${config.src}assets/js/`)
      }
    },
		plugins: [
			new ConcatPlugin({
				uglify: false,
				sourceMap: false,
				name: "libs",
				outputPath: "./",
				fileName: "[name].js",
				filesToConcat: [
					// npm
					// "./node_modules/jquery/dist/jquery.min.js",
					// libs
					`${config.src}assets/js/libs/core/**/*.js`,
				],
				attributes: {
					async: false
				}
			}),
      new webpack.ProvidePlugin({
        Promise: "es6-promise",
      }),
			// og, pathなどの書き換えが必要な場合
			// new HtmlWebpackPlugin(
			// 	_.merge({
			// 		inject: false, // jsを自動挿入するか
			// 		filename: `../../sample.html`, // 書き出し先（エントリーポイント基準）
			// 		template: `${config.src}html/sample.html`
			// 	}, config.htmlData[config.mode])
			// )
		],
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					terserOptions: {
						compress: {
								drop_console: !config.isDev,
							},
						},
				})
			],
		}
	}
}


// sass
config.sass = {
	src: `${config.src}assets/sass/**/*.scss`,
	dest: `${config.dest}assets/css/`,
	sass: {
		outputStyle: config.isDev ? "expanded" : "compressed"
	},
	autoprefixer: {}
}


// clean
config.clean = {
	files: [
		`${config.dest}assets/js/**/*.map`
	]
}


// server
config.server = {
  watchFiles: [
    `${config.dest}**/*.html`,
    `${config.dest}**/*.php`,
    `${config.dest}assets/css/**/*.css`
  ],
  // middlewareOptions: {
  //   context: "/api",
  //   options: {
	// 		target: "http://www.example.org",
	// 		changeOrigin: true
  //   }
  // },
	connectPhp: {
		isUse: false, // connectPhp 有無
    options: {
      base: config.dest
    }
	}
}

// ejs
config.ejs = {
	src: `${config.src}**/*.ejs`,
	dest: `${config.dest}`,
	exclude: `!${config.src}**/_*.ejs`,
	ejs: {
		data: {
      head: {
        title: "Site Title"
      }
		}
	}
}

export default config;
