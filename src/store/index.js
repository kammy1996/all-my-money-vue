import Vue from "vue";
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";


import { records } from '@/store/modules/records/index';
import { subscription } from '@/store/modules/subscription/index'; 
import { user } from '@/store/modules/user/index';
import { general } from '@/store/modules/general/index';

Vue.use(Vuex);
const store = new Vuex.Store({
  mutations: { 
    RESET_ALL_MODULES(state) { 
      Object.keys(state).forEach(key => state[key] = {})
    }
  },
  modules: {
    records,
    subscription,
    user,
    general
  },
  plugins: [createPersistedState()]
})


export default store ;
