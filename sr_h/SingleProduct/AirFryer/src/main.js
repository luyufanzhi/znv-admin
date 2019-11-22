/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';

/* 兼容高级语法 */
import '@/common/es6.js';

/* mint-ui */
// import 'mint-ui/lib/lazyload/style.css';
import { Lazyload } from 'mint-ui';
// import VueLazyload from 'vue-lazyload';

/* vue-resource */
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

/* filter */
import '@/filter';

/* directive */
// import './directive/directive.js'

/* store */
// import store from '@/store/store.js';

/* js */
// import 'loaders.css/loaders.css.js';
import '@/dictionary/imgSrc.js';

import FastClick from 'fastclick';

/* style */
import '../../../static/css/base.less';
// import '../../../static/css/animation/loader.css';
// import 'loaders.css/loaders.min.css';

// 解决移动端点击穿透的问题
FastClick.attach( document.body );

Vue.use( Lazyload, {
    // error: './static/images/error.png',
    // loading: './static/images/loading.gif'
} );

Vue.config.productionTip = false;

/* dev console 430KB */
// import Eruda from 'eruda';
// Eruda.init({ tool: ['console', 'elements', 'info'] });
require( [ '../config/deviceInfo.js' ], function ( def ) {
    if ( 'debug' === def.root ) {
        import( 'eruda' ).then( Eruda => Eruda.init( { tool: [ 'console', 'elements', 'info' ] } ) );
    }
} );

window.vm = new Vue( {
    el: '#app',
    router,

    // store,
    template: '<App/>',
    components: { App }
} ).$children[ 0 ];
