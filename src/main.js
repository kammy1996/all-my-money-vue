import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify'
import store from '@/store/index';
import VueProgressBar from 'vue-progressbar';
import progressOptions from '@/helpers/progressBar';


Vue.use(VueProgressBar,progressOptions);

import './assets/css/main.scss';

export default new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
