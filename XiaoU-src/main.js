// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入清除默认样式，外部公共css样式都要在此文件引入
import './assets/css/reset.css';
import './assets/css/public.css';
//引入js
import './assets/js/remScale.js';
import jq from 'jquery'
Vue.prototype.jq = jq
//全局引入矢量图标
import './assets/fonts/iconfont.css';


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
