import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify'
import store from '@/store/index';
import axios from 'axios';
import VueProgressBar from 'vue-progressbar';
// import progressOptions from '@/helpers/progressBar';

const options = {
  color: '#1976D2',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '1s',
    opacity: '0.9s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar,options);

axios.defaults.baseURL = process.env.VUE_APP_HOST_URL;

import './assets/css/main.scss';

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
