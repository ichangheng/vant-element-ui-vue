import Vue from 'vue'
import App from './App.vue'

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios';
Vue.prototype.$axios=axios;
Vue.config.productionTip = false
import './assets/iconfont/iconfont.css'
import router from "@/router";
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: h => h(App),
  router,
  axios,
}).$mount('#app')
