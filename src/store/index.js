import Vue from "vue";
import Vuex from 'vuex';

import { records } from '@/store/modules/records/index';
import { user } from '@/store/modules/user/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    records,
    user
  }
})



export default store ;
