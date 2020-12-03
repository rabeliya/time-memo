import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import store from './store'
require ("@/assets/sass/main.scss");
Vue.use(Vuelidate)
Vue.use(Vuex)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");

new Vue({
  store
})
