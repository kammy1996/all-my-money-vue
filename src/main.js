import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;

import './assets/css/main.scss'

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
