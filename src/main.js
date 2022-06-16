import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import * as echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/font/font.css';


Vue.config.productionTip = false

const proxy = Vue.extend({})
const obj = new proxy()

Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.$bus = obj;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')


import { request } from './network/request'

/* request({
  url: '/home/multidata',
  method: 'get'
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
}) */