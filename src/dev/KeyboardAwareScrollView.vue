<template>
  <div class="vue-keyboard-cn-aware-scroll-view">
    <slot />
    <div :style="{ height: height }"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: 0,
      animationFrame: null,
      animationFrameFunc: null,
    };
  },
  created() {
    this.animationFrameFunc = this.checkKeyBoardIsShowed.bind(this);
    this.animationFrame = window.requestAnimationFrame(this.animationFrameFunc);
  },
  beforeDestroy() {
    window.cancelAnimationFrame(this.animationFrame);
  },
  methods: {
    checkKeyBoardIsShowed() {
      let keyBoard = this.hasKeyBoard();
      if (keyBoard) {
        this.height =
          parseInt(window.getComputedStyle(keyBoard).height) + 20 + "px";
        console.log("!!!!有高度了");
      } else {
        this.height = 0;
      }
      this.animationFrame = window.requestAnimationFrame(
        this.animationFrameFunc
      );
    },
    /**
     * 返回已显示的虚拟键盘
     * @return dom or false
     */
    hasKeyBoard() {
      let keyBoardBox = document.querySelectorAll(".key-board-box");
      for (let i = 0; i < keyBoardBox.length; i++) {
        if (
          keyBoardBox[i] &&
          keyBoardBox[i].style &&
          keyBoardBox[i].style.display !== "none"
        ) {
          return keyBoardBox[i];
        }
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.vue-keyboard-cn-aware-scroll-view {
  overflow-y: auto;
}
</style>