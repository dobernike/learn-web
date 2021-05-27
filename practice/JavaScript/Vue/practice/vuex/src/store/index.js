import { createStore } from 'vuex';

import counterModule from './counter/index';

import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

export const store = createStore({
  modules: {
    numbers: counterModule
  },
  state() {
    return {
      isAuth: false
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters
});
