<template>
  <div class="vue-keyboard-input" @click="focus(true)">
    <span
      :class="['vue-keyboard-input-text', isSelectedAll ? 'active' : '']"
      v-html="tmpValue"
    ></span>
  </div>
</template>
<script>
import EventKeys from "./eventKeys";
const flashBlock = '<span class="key-board-flash"></span>';
import { splitStringToArray } from "./tools.js";
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
    };
  },
  computed: {
    //已输出的结果展示值（输入框里面的字符串）
    tmpValue() {
      let t = "";
      console.log("草你麻痹,!!!", this.valueArr);
      this.valueArr.forEach((e) => {
        t += e;
      });
      return t;
    },
    tmpValueNoFlash() {
      let t = "";
      let tmpArray = this.valueArr.filter((item) => item != flashBlock);
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
          this.valueArr.push(flashBlock);
        }
        //向所有组件推送，最新值
        this.$root.$emit(EventKeys["vue-keyboard-cn-update-value"], newV);
      },
      immediate: true,
    },
    isFocus(newV) {
      this.valueArr = this.value.split("");
      if (newV) {
        this.valueArr.push(flashBlock);
      } else {
        this.valueArr = this.valueArr.filter((item) => item != flashBlock);
      }
    },
  },
  created() {
    //   this.valueArr = splitStringToArray(this.value);
    document.body.oncopy = () => {};
    document.body.addEventListener("copy", this.copyFunc);
    //监听键盘关闭事件
    this.$root.$on(EventKeys["vue-keyboard-cn-show"], (bool) => {
      this.isFocus = bool;
    });
    //监听键盘内容输入
    this.$root.$on(EventKeys["vue-keyboard-cn-append-item"], (text) => {
      let tmpArray = this.valueArr.filter((item) => item != flashBlock);
      let len = tmpArray.length;
      tmpArray[len] = text;
      this.valueArr = [...tmpArray, flashBlock];
      // console.log("插入你麻痹!!!", text, "结果！！！！！", this.valueArr);
      let end = tmpArray.reduce((a, b) => a + b, "");
      this.$emit("change", end); //同步给外层
    });
    //删除
    this.$root.$on(EventKeys["vue-keyboard-cn-append-delete"], () => {
      this.deleteFn();
    });
    this.$root.$on(EventKeys["vue-keyboard-cn-select-all"], (bool) => {
      console.log("this.isSelectedAll", bool);
      this.isSelectedAll = bool;
    });
  },
  methods: {
    copyFunc() {
      alert("被复制的数据:" + window.getSelection(0).toString());
    },
    deleteFn() {
      let len = this.valueArr.length - 2;
      this.valueArr.splice(len, 2, flashBlock);
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
  &.active {
    background: rgba(135, 206, 235, 0.3);
  }
}
</style>