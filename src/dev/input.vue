<template>
  <div
    class="vue-keyboard-input-wrap"
    :style="inputWrapStyle"
    ref="wrapvueKeyboardInput"
  >
    <slot name="prepend"></slot>
    <div class="vue-keyboard-input-block">
      <div
        class="vue-keyboard-input"
        :class="[disabled ? 'disabled' : '']"
        :data-scroll-left="scrollLeft"
        :data-scroll-top="scrollTop"
        @click="focus(true)"
        ref="vueKeyboardInput"
        v-disabled-body-scroll
      >
        <template v-if="placeholder && value !== 0 && !value">
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
    </div>
    <slot name="append"></slot>

    <div
      class="vue-keyboard-input-fixed-wrap"
      :data-scroll-left="scrollLeft"
      :data-scroll-top="scrollTop"
      @click="focus(true)"
      @touchstart.stop
      :style="fixedInputWrap"
      v-if="isFocus && showFixedInput"
      ref="vue-keyboard-input-fixed-wrap"
    >
      <slot name="prependFixed"></slot>
      <div class="vue-keyboard-input-block">
        <div
          class="vue-keyboard-input-fixed"
          v-disabled-body-scroll
          ref="vueKeyboardInputFixed"
        >
          <template v-if="placeholder && value !== 0 && !value">
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
      </div>
      <slot name="appendFixed"></slot>
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
export default {
  name: "keyboardInput",
  props: {
    value: {
      type: [String, Number],
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
    docBodyAutoScroll: {
      type: Boolean,
      default: () => true,
    },
    //input可滚动的容器id或class，input获取焦点时候出发该dom滚动，让input出现到可视区
    scrollWrap: {
      type: String,
    },
    //最外层容器如果是固定横屏时候，会用到,默认是0，也就是不选择
    rotate: {
      validator: function (value) {
        return [0, 90, -90].indexOf(value) > -1;
      },
      default: () => 0,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    height: {
      type: [String, Number],
      default: () => -1,
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
    inputWrapStyle() {
      if (this.height != -1 && !isNaN(parseInt(this.height))) {
        if (/(px)$/.test(this.height)) {
          return {
            height: this.height,
            display: "block",
          };
        } else {
          return {
            height: parseFloat(this.height) + "px",
            display: "block",
          };
        }
      } else {
        console.warn("erro props  height of input");
      }
    },
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
      handler(newV, oldV) {
        let t = splitStringToArray("" + newV, this.allowEnter);
        let labelIndex = this.valueArr.findIndex((item) => item == cursorStr);
        if (this.isFocus) {
          if (labelIndex == -1) {
            t.push(cursorStr);
            this.valueArr = t;
            this.cursorIndex = this.valueArr.length - 1;
          } else {
            //数据类型
            this.valueArr = t;
            this.cursorIndex = this.valueArr.length;
            this.valueArr.splice(this.cursorIndex, 0, cursorStr); //必须要追加光标
          }
        } else if (!this.isFocus) {
          this.valueArr = t;
          this.cursorIndex = this.valueArr.length;

          this.$nextTick(() => {
            let dom = this.$refs["wrapvueKeyboardInput"];
            if (dom && this.height != -1) {
              console.log("滚动不??");
              setTimeout(() => this.scrollToBottom(dom), 500);
            }
          });
        }

        /*
         * 向所有组件推送，最新值
         *1.光标控制面板，复制需要用到
         */
        this.$root.$emit(EventKeys["vue-keyboard-cn-update-value"], "" + newV);
        //输入时候内容滚到指定位置
        this.$nextTick(() => {
          this.inputDomScroll();
          this.inputWillblur(); //失去全选
        });
      },
      immediate: true,
    },
    isFocus(newV) {
      this.valueArr = splitStringToArray(this.value, this.allowEnter);
      if (newV) {
        this.valueArr.push(cursorStr);
        this.$nextTick(() => {
          this.inputDomScroll();
        });
      } else {
        this.valueArr = this.valueArr.filter((item) => item != cursorStr);
      }
    },
    tmpValue() {
      this.$nextTick(() => {
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
  beforeDestroy() {
    document.removeEventListener("click", this.blurMethods);
  },
  methods: {
    selectAllBlur() {
      this.blurMethods = this.inputWillblur.bind(this);
      document.addEventListener("click", this.blurMethods);
    },
    /**
     * 输入框内部滚动
     * @params dom {dom}
     * @params isDefaultInput {Boolean} 是普通输入框还是固定底部的输入框
     */
    computedInputScrollDis(dom, isDefaultInput = true) {
      let scrollDisY = 0;
      let scrollDisX = 0;
      let flashDom = dom.querySelector(".key-board-flash");
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
        // console.log("有", scrollDisY, "scrollDisX", scrollDisX);
      }
      if (isDefaultInput) {
        this.scrollLeft = scrollDisX;
        this.scrollTop = scrollDisY;
      }

      dom.scrollTo(scrollDisX, scrollDisY);
    },
    /**
     * 获取当前展示的键盘高度
     */
    getKeyBoardAndHeight() {
      let keyboards = document.querySelectorAll(".key-board-box");
      let keyBoard = {
        height: 0,
        el: null,
      };
      for (let t = 0; t < keyboards.length; t++) {
        let styles = window.getComputedStyle(keyboards[t]);
        let keyBoardStyleHeight = parseInt(styles.height);
        if (keyBoardStyleHeight > 0) {
          keyBoard = {
            height: keyBoardStyleHeight,
            el: keyboards[t],
          };
          break;
        }
      }
      return keyBoard;
    },
    /**
     * 获取固定在键盘顶部的输入框的高度
     */
    getFixedInputHeight() {
      let fixedInput = this.$refs["vue-keyboard-input-fixed-wrap"];
      if (!fixedInput) {
        return 0;
      } else {
        let height = window.getComputedStyle(fixedInput).height;
        return parseFloat(height);
      }
    },
    /**
     * props scrollWrap 存在时候才会用到
     * 获取滚动容器的高度
     * @returns number
     */
    getScrollWrapHeight() {
      let scrollWrapDom;
      if (this.scrollWrap && document.querySelector(this.scrollWrap)) {
        scrollWrapDom = document.querySelector(this.scrollWrap);
      }
      if (!scrollWrapDom) {
        return 0;
      }
      let styles = window.getComputedStyle(scrollWrapDom);
      let height = parseInt(styles.height);
      return height;
    },
    /**
     * props scrollWrap 存在时候才会用到
     * 获取滚动容器的滚动高度
     * @returns number
     */
    getScrollWrapScrollY() {
      let scrollWrapDom;
      if (this.scrollWrap && document.querySelector(this.scrollWrap)) {
        scrollWrapDom = document.querySelector(this.scrollWrap);
      }
      if (!scrollWrapDom) {
        return 0;
      }
      return scrollWrapDom.scrollTop;
    },
    /**
     * 获取bodyY轴滚动距离
     */
    getBodyScrollTop() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      return scrollTop;
    },
    /**
     * 获取网页可视区的高度
     */
    getViewPortHeight() {
      const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      return viewPortHeight;
    },
    getBoundingClientRect(el, attr) {
      return el && el.getBoundingClientRect()[attr];
    },
    isDomInViewPort(dom) {
      let viewPortHeight = this.getViewPortHeight();
      let domTop = this.getBoundingClientRect(dom, "top");
      let domBottom = this.getBoundingClientRect(dom, "bottom");
      const keyBoardHeight = this.getKeyBoardAndHeight().height;
      const fixedInputHeight = this.getFixedInputHeight();
      if (this.scrollWrap && document.querySelector(this.scrollWrap)) {
        viewPortHeight = this.getScrollWrapHeight(); //滚动容器的高度
        //外层容器旋转90度时候
        //一定要画图来，才容易理解这里的参数取值
        if (this.rotate === 90) {
          domTop = viewPortHeight - this.getBoundingClientRect(dom, "left");
          return (
            domTop >= 0 &&
            this.getBoundingClientRect(dom, "left") >= keyBoardHeight
          );
        } else if (this.rotate === -90) {
          domTop = this.getBoundingClientRect(dom, "left");
          return (
            domTop >= 0 &&
            this.getBoundingClientRect(dom, "left") <=
              viewPortHeight - keyBoardHeight
          );
        }
      }
      return (
        domTop >= 0 &&
        viewPortHeight - (keyBoardHeight + fixedInputHeight) >= domBottom
      );
    },

    docBodyAutoScrollFn(dom, scrollWrapDom) {
      let scrollTop = this.getBodyScrollTop();
      let viewPortHeight = this.getViewPortHeight();
      let keyBoardInfo = this.getKeyBoardAndHeight();
      const keyBoardHeight = keyBoardInfo.height;
      const keyBoardDom = keyBoardInfo.el;
      let domBottom = this.getBoundingClientRect(dom, "bottom");
      const fixedInputHeight = this.getFixedInputHeight();
      let keyBoardTop = this.getBoundingClientRect(dom, "bottom");
      let targetY = undefined;
      if (scrollWrapDom) {
        scrollTop = this.getScrollWrapScrollY();
        viewPortHeight = this.getScrollWrapHeight(); //滚动容器的高度
        if (this.rotate === 90) {
          domBottom = viewPortHeight - this.getBoundingClientRect(dom, "left");
          keyBoardTop = viewPortHeight - keyBoardHeight; //得到键盘距离【页面视图】顶部的空隙
          targetY = scrollTop + (domBottom - keyBoardTop) + 20;
        } else if (this.rotate === -90) {
          domBottom = this.getBoundingClientRect(dom, "right"); //把input的dom高度也加 进来
          keyBoardTop = viewPortHeight - keyBoardHeight; //得到键盘距离【页面视图】顶部的空隙
          targetY = scrollTop + (domBottom - keyBoardTop) + 20;
        } else {
          //非选择
          console.log("非旋转,不做处理");
        }
      } else {
        //targetY=已经滚动的Y距离+浏览器底部距离inputDOm的距离(让内容滚回可视区)+键盘高度+补充的间距
        targetY =
          scrollTop +
          (domBottom - viewPortHeight) +
          (keyBoardHeight + fixedInputHeight) +
          20;
      }
      if (scrollWrapDom) {
        targetY !== undefined && scrollWrapDom.scrollTo(0, targetY);
      } else {
        targetY !== undefined && window.scrollTo(0, targetY);
      }
    },
    scrollToBottom(dom) {
      console.log("滚动内部高度", dom.scrollHeight);
      if (dom && dom.scrollHeight) {
        console.log("滚动到底部", dom.scrollHeight);
        dom.scrollTo(0, dom.scrollHeight);
      }
    },
    inputDomScroll() {
      //用最外层容器
      let domWrap = this.$refs["wrapvueKeyboardInput"];
      if (!domWrap) {
        return;
      }
      let domFlash = domWrap.querySelector(".key-board-flash");
      let FixedDom = this.$refs["vueKeyboardInputFixed"];
      domWrap && this.computedInputScrollDis(domWrap, true);
      FixedDom && this.computedInputScrollDis(FixedDom, false);
      //容器滚动,默认是body滚动，如果指定了滚动的容器，就不再出发body滚动
      //input获取焦点了，并且不再试图内

      //不固定高度时候用光标计算，如果是固定高度，就用容器来计算
      let noInViewProps =
        this.height == -1
          ? !this.isDomInViewPort(domFlash)
          : !this.isDomInViewPort(domWrap);
      console.log("不在试图内", noInViewProps);
      if (domFlash && noInViewProps) {
        let scrollWrapDom = document.querySelector(this.scrollWrap);
        if (this.scrollWrap && scrollWrapDom) {
          this.docBodyAutoScrollFn(domFlash, scrollWrapDom);
        } else if (this.docBodyAutoScroll) {
          this.docBodyAutoScrollFn(domFlash);
        }
      }
    },
    select() {
      this.$refs["input"].classList.add("vue-keyboard-input-text-focus");
      this.$refs["input"].focus();
      console.log("进来了");
    },
    unSelect() {
      this.$refs["input"].blur();
      this.$refs["input"].classList.remove("vue-keyboard-input-text-focus");
      console.log("失去焦点了");
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
          //延迟滚动，如果有被KeyboardAwareScrollView包裹，需要重新修复滚动
          setTimeout(() => {
            this.inputDomScroll();
            console.log("延长滚动==");
          }, 150);
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
        if (!bool) {
          return;
        }
        //可以输入后再判断处理============================
        //全选状态下输入
        if (this.currInputIsSelected()) {
          this.replaceAllWith(text);
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
        //全选状态下输入
        if (this.currInputIsSelected()) {
          this.replaceAllWith("");
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
          this.unSelect();
        } else {
          this.select();
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
        console.log("被禁用了?");
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
      var inputs = document.querySelectorAll(".vue-keyboard-input-text-focus");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("vue-keyboard-input-text-focus");
      }
      console.log("为啥会失去焦点");
    },
    replaceAllWith(val) {
      this.$emit("change", val); //v-model同步数据
      this.$emit("input", {
        value: val,
        el: this.$refs["vueKeyboardInput"],
      });
    },
    currInputRemoveSelectedClass() {
      if (this.currInputIsSelected()) {
        this.$refs["input"].classList.remove("vue-keyboard-input-text-focus");
      }
    },
    currInputIsSelected() {
      return this.$refs["input"].classList.contains(
        "vue-keyboard-input-text-focus"
      );
    },
    getClickElement(e) {
      if (this.disabled) {
        return;
      }
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
      if (this.disabled) {
        return;
      }
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
.vue-keyboard-input-wrap {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  overflow: auto;
  line-height: 30px;
  -webkit-overflow-scrolling: touch;
}
.vue-keyboard-input-block {
  flex: 1;
}
.vue-keyboard-input {
  position: relative; //它是必须的，否则会影响获取容器的滚动
  min-height: 30px;
  overflow: auto;
  box-sizing: border-box;
  line-height: 30px;
  flex: 1;
  padding: 5px;
  word-wrap: break-word;
  white-space: pre-wrap;
  -webkit-overflow-scrolling: touch;

  &.disabled {
    background: #eee;
    .vue-keyboard-input-text {
      color: #999;
    }
  }
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
  &:focus-visible {
    outline: none;
  }
  &.vue-keyboard-input-text-focus {
    background: rgba(135, 206, 235, 0.3);
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
  .emoji-icon {
    width: 20px;
    height: 20px;
  }
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