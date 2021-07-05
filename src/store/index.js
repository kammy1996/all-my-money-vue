import Vue from "vue";
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";


import { records } from '@/store/modules/records/index';
import { user } from '@/store/modules/user/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    records,
    user
  },
  plugins: [createPersistedState()]
})


export default store ;
