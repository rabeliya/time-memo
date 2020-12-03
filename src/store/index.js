import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state: {
    isDialog: false
  },
  getters: {
  },
  mutations: {
    toggleDialog(state) {
      state.isDialog = !state.isDialog;
    }
  },
  actions: {
  },
})

export default store;