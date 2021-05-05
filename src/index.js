
import input from './input.vue'

input.install = function(Vue) {
  Vue.component('input', Keyboard)
}
export default Keyboard