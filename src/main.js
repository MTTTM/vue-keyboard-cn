


import Vue from 'vue'
import App from './App.vue'

import kyInput from "./dev/input.vue";
import keyBoard from "./dev/index.vue";
import router from './router/index'
import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)
Vue.component("ky-input",kyInput)
Vue.component("key-board",keyBoard)
import 'highlight.js/styles/stackoverflow-dark.css';



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
