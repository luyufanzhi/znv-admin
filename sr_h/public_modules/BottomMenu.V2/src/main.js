// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'core-js/fn/object/define-property'
import 'core-js/fn/array/find-index'
import 'core-js/fn/object/assign'
import 'core-js/fn/array/is-array'

/* vue-resource */
// import VueResource from 'vue-resource'
// Vue.use(VueResource)

/* dev console */
// import Eruda from 'eruda'
// Eruda.init({ tool: ['console', 'elements', 'info'] });

/* filter */
import './filter/filter.js'

/* style */
import '../../../static/css/base.less'

/* 其他 */
document.body.addEventListener('touchstart', function () { });  // 解决 ios active 伪类无效的问题

Vue.config.productionTip = false;

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
