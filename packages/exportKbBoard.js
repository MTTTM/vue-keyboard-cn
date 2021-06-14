/**
 * 单独打包keyboard组件
 */
import KbBoard from "../src/dev/index.vue";
KbBoard.install = function(Vue) {
  Vue.component('kb-Board', KbBoard)
}
export default  KbBoard;
