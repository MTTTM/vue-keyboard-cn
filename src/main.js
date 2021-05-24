import Vue from 'vue'
import App from './App.vue'
import kbInput from "./dev/input";
import keyBoard from "./dev/index.vue";
Vue.config.productionTip = false
Vue.component("ky-input",kbInput)
Vue.component("key-board",keyBoard)
new Vue({
  render: h => h(App),
}).$mount('#app')
