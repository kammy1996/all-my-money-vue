import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify'
import store from '@/store/index';
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.VUE_APP_HOST_URL;

import './assets/css/main.scss';

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
