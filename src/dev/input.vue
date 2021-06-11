<template>
  <div
    class="vue-keyboard-input"
    :data-scroll-left="scrollLeft"
    :data-scroll-top="scrollTop"
    @click="focus(true)"
    ref="vueKeyboardInput"
    v-disabled-body-scroll
  >
    <template v-if="placeholder && !value">
      <div class="vue-keyboard-input-placeholder">{{ placeholder }}</div>
    </template>
    <div
      tabindex="-1"
      class="vue-keyboard-input-text"
      v-html="tmpValue"
      ref="input"
      @click="getClickElement"
      :id="inputId"
    ></div>

    <div
      class="vue-keyboard-input-fixed-wrap"
      :data-scroll-left="scrollLeft"
      :data-scroll-top="scrollTop"
      @click="focus(true)"
      :style="fixedInputWrap"
      v-if="isFocus && showFixedInput"
    >
      <slot name="prepend"></slot>
      <div
        class="vue-keyboard-input-fixed"
        v-disabled-body-scroll
        ref="vueKeyboardInputFixed"
      >
        <template v-if="placeholder && !value">
          <div class="vue-keyboard-input-placeholder">{{ placeholder }}</div>
        </template>
        <div
          tabindex="-1"
          class="vue-keyboard-input-text"
          v-html="tmpValue"
          ref="input"
          @click="getClickElement"
          :id="inputId"
        ></div>
      </div>
      <slot name="append"></slot>
    </div>
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
import { directive } from "disable-body-scroll";
export default {
  name: "keyboardInput",
  directives: {
    "disabled-body-scroll": { ...directive },
  },
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
    //如果type是mix类型，默认使用的是什么输入法
    //cn还是en，默认是cn
    inputLang: {
      validator: function (value) {
        return ["cn", "en"].indexOf(value) !== -1;
      },
      default: () => "cn",
    },
    canSwitchOtherBoard: {
      type: Boolean, //输入框是否能切换输入其他方式输入，默认true
      default: () => true,
    },
    decimal: {
      type: Number, //只有type等于float时候才有效,小数个数
      default: 2,
    },
    regx: {
      type: [RegExp],
    },
    keyBoard: {
      type: Object,
    },
    allowEnter: {
      type: Boolean,
      default: () => false, //是否允许回车键，默认否
    },
    showFixedInput: {
      type: Boolean,
      default: () => false,
    },
    placeholder: {
      type: String,
      default: () => "",
    },
    maxLength: {
      type: Number,
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
      scrollLeft: 0, //容器滚动X距离，只记录程序导致的，用户导致的忽略
      scrollTop: 0, //容器滚动的Y距离，只记录程序导致的，用户导致的忽略
      fixedInputWrap: { position: "fixed" },
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
      console.log("变了??");
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
    //同步给外层事件的值，input blur focus
    eventParams() {
      return {
        value: this.tmpValueNoFlash,
        el: this.$refs["vueKeyboardInput"],
      };
    },
  },
  watch: {
    value: {
      handler(newV) {
        let t = splitStringToArray(newV, this.allowEnter);
        let labelIndex = this.valueArr.findIndex((item) => item == cursorStr);
        // console.log("this.valueArr", this.valueArr, labelIndex);
        if (this.isFocus && labelIndex == -1) {
          t.push(cursorStr);
          this.valueArr = t;
          // console.log("新值 cursorIndex 为0", this.valueArr);
          this.cursorIndex = this.valueArr.length - 1;
        } else if (!this.isFocus) {
          this.valueArr = t;
          this.cursorIndex = this.valueArr.length;
        } else {
          this.valueArr = this.valueArr.filter((item) => item != cursorStr);
          //this.cursorIndex就是光标的索引，所以不需要-1
          this.valueArr.splice(this.cursorIndex, 0, cursorStr);
          // console.log("新值 cursorIndex 不0", this.cursorIndex, this.valueArr);
        }
        /*向所有组件推送，最新值
         *1.光标控制面板，复制需要用到
         */
        this.$root.$emit(EventKeys["vue-keyboard-cn-update-value"], newV);
        //输入时候内容滚到指定位置
        this.$nextTick(() => {
          this.inputDomScroll();
        });
      },
      immediate: true,
    },
    isFocus(newV) {
      this.valueArr = splitStringToArray(this.value, this.allowEnter);
      if (newV) {
        this.valueArr.push(cursorStr);
      } else {
        this.valueArr = this.valueArr.filter((item) => item != cursorStr);
        console.log("我是这时候变的么?");
      }
      this.inputDomScroll();
    },
    tmpValue() {
      this.$nextTick(() => {
        // this.fixAutoHeight(); //自适应高度
        this.inputDomScroll();
      });
    },
  },
  created() {
    //监听原生复制事件
    copyEventListener(this);
    this.addRootEventLister();
    this.selectAllBlur();
  },
  mounted() {
    // this.fixAutoHeight(); //自适应高度
  },
  beforeDestroy() {
    document.removeEventListener("click", this.blurMethods);
  },
  methods: {
    selectAllBlur() {
      this.blurMethods = this.inputWillblur.bind(this);
      document.addEventListener("click", this.blurMethods);
    },
    fixAutoHeight() {
      // this.$nextTick(() => {
      //   if (this.autoHeight) {
      //     let dom = this.$refs["vueKeyboardInput"];
      //     dom.style.height = dom.scrollHeight + "px";
      //   }
      // });
    },
    inputDomScroll() {
      let dom = this.$refs["vueKeyboardInput"];
      let FixedDom = this.$refs["vueKeyboardInputFixed"];
      let scrollDisY = 0;
      let scrollDisX = 0;
      let flashDom =
        this.$refs["vueKeyboardInput"].querySelector(".key-board-flash");
      let styles = window.getComputedStyle(dom);
      let paddingTop = parseInt(styles["padding-top"])
        ? parseInt(styles["padding-top"])
        : 0;
      let paddingLeft = parseInt(styles["padding-top"])
        ? parseInt(styles["padding-top"])
        : 0;
      if (flashDom) {
        scrollDisY = flashDom.offsetTop - paddingTop;
        scrollDisX = flashDom.offsetLeft - paddingLeft;
      }
      this.scrollLeft = scrollDisX;
      this.scrollTop = scrollDisY;
      dom.scrollTo(scrollDisX, scrollDisY);
      FixedDom && FixedDom.scrollTo(scrollDisX, scrollDisY);
    },
    addRootEventLister() {
      //监听键盘关闭事件
      this.$root.$on(EventKeys["vue-keyboard-cn-show"], (bool) => {
        this.isFocus = bool;
      });
      //监听键盘已显示，或已隐藏
      this.$root.$on(EventKeys["vue-keyboard-cn-showed"], (data) => {
        if (data.el && data.show) {
          this.fixedInputWrap = {};
          let computedStyle = window.getComputedStyle(data.el);
          let height = computedStyle["height"];
          let width = computedStyle["width"];
          this.fixedInputWrap = {
            position: "fixed",
            left: 0,
            bottom: height,
            width: width,
          };
        }
      });
      //监听回车事件
      this.$root.$on(EventKeys["vue-keyboard-cn-submit"], () => {
        if (!this.isFocus) {
          return false;
        }
        this.$emit("blur", this.eventParams);
        this.$emit("submit", this.eventParams);

        this.isFocus = false;
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
          if (this.allowEnter) {
            this.appendItem("<br/>");
          } else {
            this.$emit("submit", {
              value: this.value,
              el: this.$refs["vueKeyboardInput"],
            });
          }
        } else {
          let textArray = splitStringToArray(text, this.allowEnter); //分割内容为数组
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
          this.$refs["input"].classList.contains(
            "vue-keyboard-input-text-focus"
          )
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
        if (!this.isFocus) {
          return;
        }
        let movedData = moveToFn(this.valueArr, str);
        if (Array.isArray(movedData.arr)) {
          this.valueArr = movedData.arr;
          this.cursorIndex = movedData.index;
        }
      });
      //其他input触发获取焦点时候，本input失去焦点
      this.$root.$on(EventKeys["vue-keyboard-cn-focus"], (data) => {
        if (data.inputId !== this.inputId) {
          this.isFocus = false;
          this.$emit("blur", this.eventParams);
        } else {
          this.isFocus = true;
          this.$emit("focus", this.eventParams);
        }
      });
      this.$root.$on(
        EventKeys["vue-keyboard-cn-no-me-will-blur"],
        ({ inputId, keyBoard }) => {
          if (inputId !== this.inputId) {
            this.isFocus = false;
            //只有指向不是同一个键盘组件，才让当前的键盘隐藏
            if (this.keyBoard && this.keyBoard !== keyBoard) {
              this.keyBoard.show = false;
            }
          }
        }
      );
      // {
      //     inputId:this.inputId,
      //     keyBoard:this.keyBoard
      //   }
      //监听键盘关闭事件
      this.$root.$on(EventKeys["vue-keyboard-cn-show"], (bool) => {
        if (!bool) {
          this.$emit("blur", this.eventParams);
        }
      });
    },
    //是否可以添加内容，根据type来处理
    //mix(所有）int(整数)，float(小数) zh,cn //展示键盘输入方式，默认中文，和键盘相对应
    canPushItem(text) {
      let returnValue = false;
      let endText = `${this.value}${text}`;
      if (
        !isNaN(Number(this.maxLength)) &&
        this.maxLength > 0 &&
        endText.length > this.maxLength
      ) {
        return;
      }
      if (this.regx) {
        return new RegExp(this.regx).test(text);
      }
      switch (this.type) {
        case "float":
          returnValue = inputFilterRegx.float(endText, this.decimal);
          break;
        case "int":
          returnValue = inputFilterRegx.int(endText);
          break;
        case "cn":
          returnValue = inputFilterRegx.cn(endText);
          break;
        case "en":
          returnValue = inputFilterRegx.en(endText);
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
      this.$emit("change", this.tmpValueNoFlash); //v-model同步数据
      this.$emit("input", this.eventParams);
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
      this.$emit("input", this.eventParams);
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
        inputLang: this.inputLang,
        allowEnter: this.allowEnter,
      };
      console.log("this.keyBoard", this.keyBoard);
      if (this.keyBoard) {
        this.keyBoard.getInputInfo = obj;
        this.keyBoard.show = true;
      } else {
        this.$root.$emit(EventKeys["vue-keyboard-cn-focus"], obj);
      }
      //非当前id的input都失去焦点
      this.$root.$emit(EventKeys["vue-keyboard-cn-no-me-will-blur"], {
        inputId: this.inputId,
        keyBoard: this.keyBoard,
      });
    },
  },
};
</script>
<style lang="scss">
.vue-keyboard-input {
  position: relative; //它是必须的，否则会影响获取容器的滚动
  min-height: 30px;
  overflow: auto;
  box-sizing: border-box;
  line-height: 30px;
  border: 1px solid #eee;
  padding: 5px;
  word-wrap: break-word;
  white-space: pre-wrap;
  -webkit-overflow-scrolling: touch;
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
  display: inline-block;
  position: relative;
  z-index: 10;
  &.vue-keyboard-input-text-focus {
    &:focus {
      background: rgba(135, 206, 235, 0.3);
    }
  }
}
.vue-keyboard-input-fixed-wrap {
  position: fixed;
  background: #eee;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  z-index: 9999;
  overflow: hidden;
}
.vue-keyboard-input-fixed {
  position: relative;
  box-sizing: border-box;
  height: 40px;
  overflow: auto;
  background: #fff;
  -webkit-overflow-scrolling: touch;
  flex: 1;
  .vue-keyboard-input-text {
    flex: 1;
    padding: 5px;
  }
  .confirm-btn {
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-arrow-right-filling {
      font-size: 22px;
    }
  }
}
.vue-keyboard-input-placeholder {
  color: #999;
  position: absolute;
  z-index: 0;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>