<template>
  <div class="vue-keyboard-input" @click="focus(true)">
    <span
      :id="inputId"
      tabindex="0"
      :class="['vue-keyboard-input-text', isSelectedAll ? 'active' : '']"
      v-html="tmpValue"
      ref="input"
    ></span>
  </div>
</template>
<script>
import EventKeys from "./eventKeys";
import { splitStringToArray } from "./tools.js";
import { copyEventListener, onNaticeCopyEvent } from "./copyPaste.js";
import { cursorStr, moveToFn } from "./cursor.js";
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
      isFocus: false, //获取焦点
      valueArr: [], //已填入的字符串转数组
      isSelectedAll: false,
      cursorIndex: 0, //当前光标的位置，也就是下一次输入内容插入的位置
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
        t += e;
      });
      return t;
    },
  },
  watch: {
    value: {
      handler(newV) {
        this.valueArr = splitStringToArray(newV);
        if (this.isFocus) {
          this.valueArr.push(cursorStr);
        }
        this.cursorIndex = this.valueArr.length - 1;
        //向所有组件推送，最新值
        this.$root.$emit(EventKeys["vue-keyboard-cn-update-value"], newV);
      },
      immediate: true,
    },
    isFocus(newV) {
      this.valueArr = this.value.split("");
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
      let textArray = splitStringToArray(text); //分割内容为数组
      textArray.forEach((item) => this.appendItem(item));
    });
    //删除
    this.$root.$on(EventKeys["vue-keyboard-cn-append-delete"], () => {
      this.deleteFn();
    });
    //全选按钮
    this.$root.$on(EventKeys["vue-keyboard-cn-select-all"], () => {
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
      let movedData = moveToFn(this.valueArr, str);
      if (Array.isArray(movedData.arr)) {
        this.valueArr = movedData.arr;
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
    appendItem(text = "") {
      let tmpArray = this.valueArr.filter((item) => item != cursorStr);
      let len = tmpArray.length;
      tmpArray[len] = text;
      this.valueArr = [...tmpArray, cursorStr];
      this.cursorIndex = this.valueArr.length;
      // let end = tmpArray.reduce((a, b) => a + b, "");
      // this.$emit("change", end); //同步给外层
    },
    nativeCopyCallback(str) {
      onNaticeCopyEvent(str); //已经做去重处理
    },
    deleteFn() {
      let len = this.valueArr.length - 2;
      this.valueArr.splice(len, 2, cursorStr);
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