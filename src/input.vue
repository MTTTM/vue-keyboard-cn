<template>
  <div class="vue-keyboard-input" @click="focus(true)" v-html="tmpValue"></div>
</template>
<script>
import EventKeys from "./eventKeys";
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
    };
  },
  computed: {
    //已输出的结果展示值（输入框里面的字符串）
    tmpValue() {
      let t = "";
      this.valueArr.forEach((e) => {
        t += e;
      });
      return t;
    },
  },
  watch: {
    value: {
      handler(newV, oldV) {
        this.valueArr = this.value.split("");
        if (!oldV && this.show) {
          this.valueArr.push('<span class="key-board-flash"></span>');
        }
      },
      immediate: true,
    },
    isFocus(newV) {
      this.valueArr = this.value.split("");
      console.log("newV", newV);
      if (newV) {
        this.valueArr.push('<span class="key-board-flash"></span>');
      } else {
        this.valueArr = this.valueArr.filter(
          (item) => item != '<span class="key-board-flash"></span>'
        );
      }
    },
  },
  created() {
    //监听键盘关闭事件
    this.$root.$on(EventKeys["vue-keyboard-cn-show"], (bool) => {
      this.isFocus = bool;
    });
    //监听键盘内容输入
    this.$root.$on(EventKeys["vue-keyboard-cn-append-item"], (data) => {
      this.valueArr = data;
      console.log("append", data, this.tmpValue);
      this.$emit("change", this.tmpValue); //同步给外层
    });
  },
  methods: {
    focus(bool = false) {
      this.isFocus = bool;
      this.$root.$emit(EventKeys["vue-keyboard-cn-focus"], {
        isFocus: bool,
        value: this.valueArr,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
}
</style>