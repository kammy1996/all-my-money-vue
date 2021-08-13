import * as  actions from './actions';
import * as getters from './getters';
import * as  mutations from './mutations';
import state from './state';

export const general = {
  namespaced:true,
  state,
  actions,
  mutations,
  getters
}
