/**
 * npm包入口文件
 */
import KyInputComponent from '../src/dev/input.vue';
import KyBoardComponent from "../src/dev/index.vue";
require("../src/dev/assets/js/requestAnimationFrame.js");
export const KyInput = KyInputComponent;
export const KyBoard = KyBoardComponent;
export default {
  KyInput,
  KyBoard
}