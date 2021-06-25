


import Vue from 'vue'
import App from './App.vue'

import kyInput from "./dev/input.vue";
import keyBoard from "./dev/index.vue";
import KeyboardAwareScrollView from "./dev/KeyboardAwareScrollView.vue"
import router from './router/index'

// import { directive, event, directiveForDom } from "vue-horizontal-screen";
import { directive, event, directiveForDom } from "./assets/js/ueHorizontalScreen";
Vue.directive("horizontal-screen", { ...directive });
Vue.directive("hs-swipe", { ...directiveForDom });
Vue.component("ky-input", kyInput)
Vue.component("key-board", keyBoard)
Vue.component("key-board-aware-scroll-view", KeyboardAwareScrollView)
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
