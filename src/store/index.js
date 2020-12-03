import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state: {
// dataと同じ
    isDialog: false
  },
  getters: {
// 算出プロパティと同じ
  },
  mutations: {
// stateデータを直接操作 非同期処理は定義不可能
// データの変更は必ずここを経由する
toggleDialog(state) {
  state.isDialog = !state.isDialog;
}
  },
  actions: {
// mutations の操作を各コンポーネントから呼び出すために使用する関数 非同期処理可能
  },
})

// store.commit('anything')

export default store;