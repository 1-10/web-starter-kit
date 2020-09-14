/**
 * server v1.0.1
 * 2020-06-04
 */
import config from "../config.js";
import _ from "lodash";
import { watch } from "gulp";
import $browserSync from "browser-sync";
import proxyMiddleware from "http-proxy-middleware";
import $connectPhp from "gulp-connect-php";


/**
 * https://www.browsersync.io/
 * https://github.com/chimurai/http-proxy-middleware
 * https://github.com/micahblu/gulp-connect-php
**/


let serverConfig = _.merge({
  watchFiles: [
    `${config.dest}**/*.html`,
    `${config.dest}**/*.php`,
    `${config.dest}assets/css/**/*.css`
  ],
	browserSync: {
		options: {
			server: {
				baseDir: config.dest
			},
			middleware: []
		}
	},
	middlewareOptions: null, // proxyMiddleware
	connectPhp: {
		isUse: false, // connectPhp 有無
		options: {
      port: 8000,
      hostname: "127.0.0.1",
      base: config.dest
    }
	}
}, config.server);

// proxy setting
if(serverConfig.connectPhp.isUse){
  serverConfig.browserSync.options.server = null;
  serverConfig.browserSync.options.proxy = serverConfig.connectPhp.options.hostname + ":" + serverConfig.connectPhp.options.port
}


export function browserSync () {
  // liveReload
  if(serverConfig.watchFiles.length){
    watch(serverConfig.watchFiles)
      .on("change", () => {
          $browserSync.reload();
      });
  }

  // middleware
	if (serverConfig.middlewareOptions) {
		serverConfig.browserSync.options.middleware.push(
			proxyMiddleware(serverConfig.middlewareOptions.context, serverConfig.middlewareOptions.options)
		);
	}

  return $browserSync(serverConfig.browserSync.options);
}


export function server () {
  if (serverConfig.connectPhp.isUse) {
    return $connectPhp.server(serverConfig.connectPhp.options, () => {
      browserSync();
    });
  } else {
    return browserSync();
  }
}
