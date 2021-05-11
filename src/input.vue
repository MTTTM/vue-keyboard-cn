<template>
  <div class="vue-keyboard-input" @click="focus(true)">
    <span
      tabindex="0"
      class="vue-keyboard-input-text"
      v-html="tmpValue"
      ref="input"
      @click="getClickElement"
    ></span>
  </div>
</template>
<script>
import EventKeys from "./eventKeys";
import {
  splitStringToArray,
  getElementIndexOnParent,
  labelStringRemoveLabel,
} from "./tools.js";
import { copyEventListener, onNaticeCopyEvent } from "./copyPaste.js";
import { cursorStr, moveToFn, moveTo } from "./cursor.js";
export default {
  props: {
    value: {
      type: String,
      required: true,
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
    };
  },
  computed: {
    inputId() {
      return `input-id-${new Date().time}`;
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
        if (/<span/gi.test(e)) {
          e = labelStringRemoveLabel(e); //移除普通文本包裹的标签
        }
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
        //向所有组件推送，最新值
        //this.$root.$emit(EventKeys["vue-keyboard-cn-update-value"], newV);
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
        return;
      }
      if (!text) {
        return;
      }
      let textArray = splitStringToArray(text); //分割内容为数组
      textArray.forEach((item) => this.appendItem(item));
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
      if (!this.isFocus) {
        return;
      }
      if (this.$refs["input"]) {
        this.$refs["input"].focus();
      }
      document.querySelector(".vue-keyboard-input-text").focus();
    });
    //监听原生复制
    this.$root.$on(
      EventKeys["vue-keyboard-cn-natice-copy"],
      this.nativeCopyCallback
    );
    //监听方向
    this.$root.$on(EventKeys["vue-keyboard-cn-cursor-move"], (str) => {
      if (!this.isFocus) {
        return;
      }
      let movedData = moveToFn(this.valueArr, str);
      if (Array.isArray(movedData.arr)) {
        this.valueArr = movedData.arr;
        this.cursorIndex = movedData.index;
        console.log("this.cursorIndex111", this.cursorIndex);
      }
    });
  },
  beforeDestroy() {
    this.$root.$off(
      EventKeys["vue-keyboard-cn-natice-copy"],
      this.nativeCopyCallback
    );
  },
  methods: {
    getClickElement(e) {
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
    nativeCopyCallback(str) {
      if (!this.isFocus) {
        return;
      }
      onNaticeCopyEvent(str); //已经做去重处理
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
      this.$root.$emit(EventKeys["vue-keyboard-cn-focus"], {
        isFocus: bool,
        value: this.valueArr,
        tmpValueNoFlash: this.tmpValueNoFlash,
      });
    },
  },
};
</script>
<style lang="scss">
.vue-keyboard-input {
  max-width: 600px;
  height: 300px;
  line-height: 30px;
  border: 1px solid #eee;
  padding: 5px;
  word-wrap: break-word;
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
  &.active,
  &:focus {
    background: rgba(135, 206, 235, 0.3);
  }
}
</style>