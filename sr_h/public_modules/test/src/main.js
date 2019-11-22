// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* mint-ui */
// import Mint from 'mint-ui';
// import 'mint-ui/lib/style.css';
// Vue.use(Mint);
// import { Picker } from 'mint-ui';
// import 'mint-ui/lib/picker/style.css'
// Vue.component(Picker.name, Picker);

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
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
