
/**
 * 单独打包kbinput组件
 */
import KbInput from '../src/dev/input.vue';
KbInput.install = function(Vue) {
  Vue.component('kb-Input', KbInput)
}
export default KbInput
