'use strict'

// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const info = require('./deviceInfo')

/**
 * 需要修改的内容
 */
// guide 关掉调试工具
const PATH_ROOT = info.root;
// 项目 SID
const PATH_CUR = info.id;

// 判断是否大小写
let letter = /[A-Z]$/.test(PATH_CUR);
letter = letter ? '/_pic' : '';

let assetsRoot = path.resolve(__dirname, `../dist/device/${ PATH_ROOT }/${ PATH_CUR }/h5_001/`);
let index = path.resolve(__dirname, `${assetsRoot}/index.html`);

// 上库地址
if ( 'guide' === PATH_ROOT ) {
    assetsRoot = path.resolve(__dirname, `../../../..${letter}/${PATH_CUR}/h5_001/`);
    index = path.resolve(__dirname, `${assetsRoot}/index.html`);
}

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 1001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false,
    },

    build: {
        env: require('./prod.env'),

        // 本地调试目录
        // index: path.resolve(__dirname, `../dist/device/${ PATH_ROOT }/${ PATH_CUR }/h5_001/index.html`),
        // assetsRoot: path.resolve(__dirname, `../dist/device/${ PATH_ROOT }/${ PATH_CUR }/h5_001/`),

        // 上库
        // index: path.resolve(__dirname, `../../../..${letter}/${PATH_CUR}/h5_001/index.html`),
        // assetsRoot: path.resolve(__dirname, `../../../..${letter}/${PATH_CUR}/h5_001/`),

        index,
        assetsRoot,

        assetsSubDirectory: 'static',
        assetsPublicPath: `/device/${ PATH_ROOT }/${ PATH_CUR }/h5_001/`,
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
