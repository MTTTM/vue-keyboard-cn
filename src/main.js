import Vue from 'vue'
import App from './App.vue'
import kbInput from "./input.vue";
import keyBoard from "./index.vue";
Vue.config.productionTip = false
Vue.component("ky-input",kbInput)
Vue.component("key-board",keyBoard)
new Vue({
  render: h => h(App),
}).$mount('#app')
