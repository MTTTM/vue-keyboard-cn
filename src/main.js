


import Vue from 'vue'
import App from './App.vue'

import kyInput from "./dev/input.vue";
import keyBoard from "./dev/index.vue";
import router from './router/index'
Vue.component("ky-input",kyInput)
Vue.component("key-board",keyBoard)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
