import { fileURLToPath, URL } from "node:url";
import { copyFileSync } from "node:fs"
import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import postCssPxToRem from "postcss-pxtorem"
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// import commonjs from '@rollup/plugin-commonjs'
// import requireTransform from 'vite-plugin-require-transform'

import * as babel from '@babel/core';

// A very simple Vite plugin support babel transpilation
const babelPlugin = {
  name: 'plugin-babel',
  transform: (src, id) => {
    if (/\.(jsx?|vue)$/.test(id)) {              // the pattern of the file to handle
      return babel.transform(src, {
        filename: id,
        babelrc: true,
      });
    }
  },
};

/**
 * 复制 env config 文件
 */
// if (["test"].includes(process.env.mode)) {
// 	const fromFile = path.resolve(__dirname, `./env/${process.env.mode}.config.js`)
// 	const toFile = path.resolve(__dirname, "./src/config/index.js")
// 	copyFileSync(fromFile, toFile, 0);
// }

// if (["dev"].includes(process.env.mode)) {
// 	const fromFile = path.resolve(__dirname, `./env/${process.env.mode}.config.js`)
// 	const toFile = path.resolve(__dirname, "./src/config/index.js")
// 	copyFileSync(fromFile, toFile, 0)
// }

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		// commonjs(),
		// requireTransform({
		// 	fileRegex: /.js$|.vue$|.ts$/
		// }),
		vue({
			// script: {
			// 	babelParserPlugins: ['decorators'],     // 必须开启 decorators 支持
			// },
			babel: {
				plugins: [
					["@babel/plugin-proposal-decorators", { legacy: true }],
					["@babel/plugin-proposal-class-properties", { loose: true }],
				]
			}
		}),
		babelPlugin,
		vueJsx(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
			directoryAsNamespace: true,
		}),
		viteCommonjs({
			transformMixedEsModules: true
		}),
	], 
	envDir : './env',
	base: './',
	resolve: {
		alias: {
			"@": fileURLToPath(new URL('./src', import.meta.url)),
		},
		extensions: ['.js', '.vue', '.css', '.json', '.scss', '.ts', '.jsx'],
	},
	css: {
		postcss: {
			plugins: [	
				postCssPxToRem({
					rootValue: 75,
					propList: ["*"],
					mediaQuery: false,
					selectorBlackList: ['pc-'], // 过滤掉norem-开头的class，不进行rem转换
				}),
			],
		},
	},
	server: {
		host: "0.0.0.0",
		port: 5173,
		https: false,
		hmr: true,
		watch: {
			usePolling: true
		}
	},
});
