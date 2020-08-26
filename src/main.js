// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/reset.css'
Vue.config.productionTip = false


//全局引入阿秀
import axios from 'axios'
//全局引入element-ui
import ElementUI from 'element-ui'
//引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
//调用element-ui
Vue.use(ElementUI)
Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
