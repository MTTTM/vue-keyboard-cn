<template>
  <div class="vue-keyboard-input" @click="focus(true)">
    <div
      tabindex="-1"
      class="vue-keyboard-input-text"
      v-html="tmpValue"
      ref="input"
      @click="getClickElement"
      :id="inputId"
    ></div>
  </div>
</template>
<script>
import EventKeys from "./eventKeys";
import inputFilterRegx from "./inputFilterRegx";
import {
  splitStringToArray,
  getElementIndexOnParent,
  labelStringRemoveLabelExceptImg,
  uuid,
  wrapStringSingleItem,
} from "./tools.js";
import { copyEventListener } from "./copyPaste.js";
import { cursorStr, moveToFn, moveTo } from "./cursor.js";
export default {
  name: "keyboardInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    type: {
      type: [String],
      required: false,
      default: "mix", //mix(所有）int(整数)，float(小数) zh,cn //展示键盘输入方式，默认中文，和键盘相对应
    },
    showZh: {
      type: Boolean, //是否可切换到中文
      default: true,
    },
    canSwitchOtherBoard: {
      type: Boolean, //输入框是否能切换输入其他方式输入，默认否
      default: () => false,
    },
    decimal: {
      type: Number, //只有type等于float时候才有效,小数个数
      default: 2,
    },
    regx: {
      type: String,
      default: () => "-1",
    },
    keyBoard: {
      type: Object,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      isFocus: false, //获取焦点，可输入的状态
      valueArr: [], //已填入的字符串转数组
      cursorIndex: null, //当前光标的位置，也就是下一次输入内容插入的位置
      blurMethods: null, //点击document失去焦点事件
    };
  },
  computed: {
    inputId() {
      let tString = new Date().getTime();
      return `input-id-${tString}-${uuid()}`;
    },
    //已输出的结果展示值（输入框里面的字符串）
    tmpValue() {
      let t = "";
      this.valueArr.forEach((e) => {
        t += e;
      });
      return t;
    },
    tmpValueNoFlash() {
      let t = "";
      let tmpArray = this.valueArr.filter((item) => item != cursorStr);
      tmpArray.forEach((e) => {
        e = labelStringRemoveLabelExceptImg(e); //移除普通文本包裹的标签
        t += e;
      });
      return t;
    },
  },
  watch: {
    value: {
      handler(newV) {
        let t = splitStringToArray(newV);
        let labelIndex = this.valueArr.findIndex((item) => item == cursorStr);
        console.log("this.valueArr", this.valueArr, labelIndex);
        if (this.isFocus && labelIndex == -1) {
          t.push(cursorStr);
          this.valueArr = t;
          console.log("新值 cursorIndex 为0", this.valueArr);
          this.cursorIndex = this.valueArr.length - 1;
        } else if (!this.isFocus) {
          this.valueArr = t;
          this.cursorIndex = this.valueArr.length;
        } else {
          this.valueArr = this.valueArr.filter((item) => item != cursorStr);
          //this.cursorIndex就是光标的索引，所以不需要-1
          this.valueArr.splice(this.cursorIndex, 0, cursorStr);
          console.log("新值 cursorIndex 不0", this.cursorIndex, this.valueArr);
        }
        /*向所有组件推送，最新值
         *1.光标控制面板，复制需要用到
         */
        this.$root.$emit(EventKeys["vue-keyboard-cn-update-value"], newV);
      },
      immediate: true,
    },
    isFocus(newV) {
      this.valueArr = splitStringToArray(this.value);
      if (newV) {
        this.valueArr.push(cursorStr);
      } else {
        this.valueArr = this.valueArr.filter((item) => item != cursorStr);
      }
    },
  },
  created() {
    //监听原生复制事件
    copyEventListener(this);
    //监听键盘关闭事件
    this.$root.$on(EventKeys["vue-keyboard-cn-show"], (bool) => {
      this.isFocus = bool;
    });
    //监听键盘内容输入
    this.$root.$on(EventKeys["vue-keyboard-cn-append-item"], (text) => {
      if (!this.isFocus) {
        return false;
      }
      if (!text) {
        return false;
      }
      let bool = this.canPushItem(text);
      console.log("可输入么?", bool, "this.type", this.type, "值:", text);
      if (!bool) {
        return;
      }
      if (text === " ") {
        this.appendItem(wrapStringSingleItem(text));
      } else if (text === "\r\n") {
        this.appendItem("<br/>");
      } else {
        let textArray = splitStringToArray(text); //分割内容为数组
        textArray.forEach((item) => this.appendItem(item));
      }
    });
    //删除
    this.$root.$on(EventKeys["vue-keyboard-cn-append-delete"], () => {
      if (!this.isFocus) {
        return;
      }
      this.deleteFn();
    });
    //全选按钮
    this.$root.$on(EventKeys["vue-keyboard-cn-select-all"], () => {
      if (!this.isFocus || !this.$refs["input"]) {
        return;
      }
      if (
        this.$refs["input"].classList.contains("vue-keyboard-input-text-focus")
      ) {
        this.$refs["input"].blur();
        this.$refs["input"].classList.remove("vue-keyboard-input-text-focus");
      } else {
        this.$refs["input"].classList.add("vue-keyboard-input-text-focus");
        this.$refs["input"].focus();
      }
    });
    //监听方向
    this.$root.$on(EventKeys["vue-keyboard-cn-cursor-move"], (str) => {
      console.log("this.cursorIndex111", this.isFocus);
      if (!this.isFocus) {
        return;
      }
      let movedData = moveToFn(this.valueArr, str);
      console.log("this.cursorIndex111", this.cursorIndex);
      if (Array.isArray(movedData.arr)) {
        this.valueArr = movedData.arr;
        this.cursorIndex = movedData.index;
      }
    });
    //其他input触发获取焦点时候，本input失去焦点
    this.$root.$on(EventKeys["vue-keyboard-cn-focus"], (data) => {
      if (data.inputId !== this.inputId) {
        this.isFocus = false;
      } else {
        this.isFocus = true;
      }
    });
    this.blurMethods = this.inputWillblur.bind(this);
    document.addEventListener("click", this.blurMethods);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.blurMethods);
  },
  methods: {
    //是否可以添加内容，根据type来处理
    //mix(所有）int(整数)，float(小数) zh,cn //展示键盘输入方式，默认中文，和键盘相对应
    canPushItem(text) {
      let returnValue = false;
      if (this.regx !== "-1" && this.regx) {
        return new RegExp(`${this.regx}`, "g").test(text);
      }
      switch (this.type) {
        case "float":
          returnValue = inputFilterRegx.float(`${this.value}${text}`);
          break;
        case "int":
          returnValue = inputFilterRegx.int(`${this.value}${text}`);
          break;
        case "cn":
          returnValue = inputFilterRegx.cn(`${this.value}${text}`);
          break;
        case "en":
          returnValue = inputFilterRegx.en(`${this.value}${text}`);
          break;
        default:
          returnValue = true;
          break;
      }
      return returnValue;
    },
    inputWillblur(e) {
      if (!this.isFocus) {
        return;
      }
      if (
        e.target &&
        typeof e.target.getAttribute == "function" &&
        e.target.getAttribute("attr-input-select") !== "true"
      ) {
        this.$refs["input"].classList.remove("vue-keyboard-input-text-focus");
      }
    },
    getClickElement(e) {
      console.log("点击元素", e.target);
      if (
        e.target &&
        e.target.classList &&
        e.target.classList.contains("vue-keyboard-input-text")
      ) {
        return;
      }
      let index = getElementIndexOnParent(e.target);
      let movedData = moveTo(this.valueArr, index);
      if (Array.isArray(movedData.arr)) {
        this.valueArr = movedData.arr;
        this.cursorIndex = movedData.index;
      }
    },
    appendItem(text = "") {
      if (!text) {
        return;
      }
      //光标处插入文字
      this.valueArr.splice(this.cursorIndex, 0, text);
      this.cursorIndex = this.cursorIndex + 1;
      //修复光标
      let tmpArray = this.valueArr.filter((item) => item != cursorStr);
      tmpArray.splice(this.cursorIndex, 0, cursorStr);
      this.valueArr = tmpArray;
      this.$emit("change", this.tmpValueNoFlash); //同步给外层
    },
    deleteFn() {
      if (this.cursorIndex <= 0) {
        this.cursorIndex = 0;
        return;
      }
      //删掉光标前一个字符串
      this.valueArr.splice(this.cursorIndex - 1, 1);
      //修复光标的坐标
      this.cursorIndex = this.cursorIndex - 1;
      this.$emit("change", this.tmpValueNoFlash); //同步给外层
    },
    focus(bool = false) {
      this.isFocus = bool;
      let obj = {
        isFocus: bool,
        value: this.valueArr,
        tmpValueNoFlash: this.tmpValueNoFlash,
        type: this.type,
        canSwitchOtherBoard: this.canSwitchOtherBoard,
        inputId: this.inputId,
        showZh: this.showZh,
      };
      if (this.keyBoard && this.keyBoard.$attrs) {
        this.keyBoard.getInputInfo = obj;
        this.keyBoard.show = true;
      } else {
        this.$root.$emit(EventKeys["vue-keyboard-cn-focus"], obj);
      }
    },
  },
};
</script>
<style lang="scss">
.vue-keyboard-input {
  max-width: 600px;
  height: 300px;
  overflow: auto;
  line-height: 30px;
  border: 1px solid #eee;
  padding: 5px;
  word-wrap: break-word;
  white-space: pre-wrap;
  .vue-keyboard-text-item {
    display: inline-block;
  }
  .vue-keyboard-text-item-br {
    display: block;
  }
  @keyframes flash {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .key-board-flash {
    display: inline-block;
    width: 2px;
    height: 12px;
    background: red;
    animation: flash 0.3s infinite linear;
  }
  .emoji-icon {
    width: 20px;
    height: 20px;
  }
}
.vue-keyboard-input-text {
  &.vue-keyboard-input-text-focus {
    &:focus {
      background: rgba(135, 206, 235, 0.3);
    }
  }
}
</style>