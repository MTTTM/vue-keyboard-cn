<template>
  <div
    :class="['key-board-box', screenDir == 1 ? 'hs-key-board-box' : '']"
    v-show="show"
  >
    <div class="key-board-box-head-op">
      <!-- 键盘设置列表 -->
      <span
        class="head-op-icon"
        v-for="(item, index) in operationList"
        :key="item.id"
        @click.prevent.stop="operateBtnFn(index)"
        :class="[operationActiveIndex == index ? 'active' : '']"
      >
        <span :class="item.classs"></span>
      </span>
    </div>
    <component
      v-bind:is="currentView"
      :emojiMap="emojiMap"
      :inputValue="value"
    ></component>
  </div>
</template>
<script>
import Board from "./board.vue";
import Emoji from "./emoji.vue";
import Operation from "./operation.vue";
import EventKeys from "./eventKeys";
import { onNaticeCopyEvent } from "./copyPaste.js";
export default {
  components: { Board, Emoji, Operation },
  props: {
    type: {
      type: [String],
      required: false,
      default: "number", //zh,en,number
    },
    // value: {
    //   type: String,
    //   required: true,
    // },
    lang: {
      type: String,
      default: "zh",
    },
    emojiMap: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
      currentView: "",
      operationActiveIndex: 2, //切换列表高亮索引
      operationList: [
        {
          classs: "icon iconfont icon-keyboard-26",
          id: 1,
        },
        {
          classs: "icon iconfont icon-smile",
          id: 2,
        },
        {
          classs: "icon iconfont icon-operation",
          id: 3,
        },
        {
          classs: "icon iconfont icon-arrow-right-filling icon-route",
          id: 4,
        },
      ],
      bodyEl: document.body,
      top: 0,
      value: "", //输入框组件的值，不可以手动改
      windowChangeCallbackBind: null,
      windowChangeTimer: null,
      screenDir: 0, //竖屏 0 横屏1
    };
  },
  watch: {
    show: {
      handler() {
        this.fixedBg();
      },
      immediate: true,
    },
  },
  created() {
    this.bodyEl = document.body;

    //获取最新输入框的值
    this.$root.$on(EventKeys["vue-keyboard-cn-update-value"], (newV) => {
      this.value = newV;
      console.log("更新值", this.value);
    });
    //监听原生复制，
    this.$root.$on(
      EventKeys["vue-keyboard-cn-natice-copy"],
      this.nativeCopyCallbackWrite
    );
  },
  mounted() {
    this.changeView();
    this.$root.$on(EventKeys["vue-keyboard-cn-focus"], (data) => {
      let { isFocus, tmpValueNoFlash } = data;
      this.show = isFocus;
      this.value = tmpValueNoFlash; //直接引用
    });
    //监听键盘关闭事件
    this.$root.$on(EventKeys["vue-keyboard-cn-show"], (bool) => {
      this.show = bool;
    });
    this.operateBtnFn(this.operationActiveIndex);
    this.windowChangeCallbackBind = this.windowChange.bind(this);
    this.windowChangeCallbackBind();
    if ("onorientationchange" in window) {
      window.addEventListener(
        "orientationchange",
        this.windowChangeCallbackBind
      );
    } else {
      window.addEventListener("resize", this.windowChangeCallbackBind);
    }
  },
  beforeDestroy() {
    this.$root.$off(
      EventKeys["vue-keyboard-cn-natice-copy"],
      this.nativeCopyCallbackWrite
    );
    window.removeEventListener(
      "orientationchange",
      this.windowChangeCallbackBind
    );
    window.removeEventListener("resize", this.windowChangeCallbackBind);
  },
  methods: {
    windowChange() {
      clearTimeout(this.windowChangeTimer);
      this.windowChangeTimer = setTimeout(() => {
        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;

        if (clientWidth > clientHeight) {
          this.screenDir = 1;
        } else {
          this.screenDir = 0;
        }
        console.log("this.screenDir", this.screenDir);
      }, 50);
    },
    nativeCopyCallbackWrite(str) {
      if (!str) {
        return;
      }
      onNaticeCopyEvent(str); //已经做去重处理
    },
    changeView(path = "board") {
      this.currentView = path;
    },
    operateBtnFn(index) {
      if (index != 3) {
        this.operationActiveIndex = index;
      }
      switch (index) {
        case 0:
          this.changeView("board");
          break;
        case 1:
          this.changeView("Emoji");
          break;
        case 2:
          this.changeView("Operation");
          break;
        case 3:
          this.show = false;
          this.$root.$emit(EventKeys["vue-keyboard-cn-show"], false);
          break;
      }
    },
    fixedBg() {
      if (this.show) {
        this.top = window.scrollY;
        this.bodyEl.style.position = "fixed";
        this.bodyEl.style.top = -top + "px";
      } else {
        this.bodyEl.style.position = "";
        this.bodyEl.style.top = "";

        window.scrollTo(0, top); // 回到原先的top
      }
    },
  },
};
</script>
<style lang="scss" >
@font-face {
  font-family: "iconfont"; /* Project id 2524527 */
  src: url("./assets/font/iconfont.woff2?t=1620317185581") format("woff2"),
    url("./assets/font/iconfont.woff?t=1620317185581") format("woff"),
    url("./assets/font/iconfont.ttf?t=1620317185581") format("truetype");
}
body {
  width: 100%;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-iconfontsvgnext:before {
  content: "\e629";
}

.icon-bg-next:before {
  content: "\e649";
}

.icon-24gf-previous:before {
  content: "\ea88";
}

.icon-bg-previous:before {
  content: "\e645";
}

.icon-skip-previous:before {
  content: "\e8d7";
}

.icon-enter:before {
  content: "\e673";
}

.icon-delete:before {
  content: "\e66a";
}

.icon-keyboard-26:before {
  content: "\e675";
}

.icon-operation:before {
  content: "\e679";
}

.icon-smile:before {
  content: "\e67e";
}

.icon-setting:before {
  content: "\e67d";
}

.icon-arrow-left-filling:before {
  content: "\e68a";
}

.icon-arrow-right-filling:before {
  content: "\e68b";
}

.input {
  max-width: 600px;
  height: 300px;
  line-height: 30px;
  border: 1px solid #eee;
  padding: 5px;
  word-wrap: break-word;
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
.key-board-box {
  touch-action: none;
  user-select: none;
  width: 100%;
  height: 35%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #eee;
  padding: 5px 0;
  user-select: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  &.hs-key-board-box {
    height: 60%;
    max-height: 300px;
  }
  .key-board-box-head {
    height: 40px;
    background: #eee;
  }
  // .key-board-box-body {
  // }
  // .key-board-box-item-wrap {
  //   display: flex;
  //   & + .key-board-box-item-wrap {
  //     margin-top: 5px;
  //   }
  // }
  // .key-board-box-item {
  //   background: rgba(255, 255, 255, 0.6);
  //   opacity: 0.8;
  //   font-size: 14px;
  //   padding: 5px 0;
  //   height: 30px;
  //   flex: 1;
  //   border-radius: 4px;
  //   display: flex;
  //   justify-content: center;
  //   align-content: center;
  //   transition: 0.5s;
  //   color: #000;
  //   span {
  //     line-height: 30px;
  //     font-size: 14px;
  //     white-space: nowrap;
  //   }
  //   &.fn-text {
  //     span {
  //       font-size: 12px;
  //     }
  //   }
  //   &:active {
  //     background: rgba(255, 255, 255, 1);
  //     opacity: 0.2;
  //     color: #666;
  //   }
  //   & + .key-board-box-item {
  //     margin-left: 5px;
  //   }
  // }
}
// .key-board-box-head-op {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 40px;
.icon-route {
  transform: rotate(90deg);
}
//   .head-op-icon {
//     height: 40px;
//     font-size: 14px;
//     flex: 1;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     &.active {
//       color: orange;
//     }
//   }
//   &.zh-text-list-box {
//     justify-content: flex-start;
//     align-items: flex-start;
//     flex-direction: column;
//     .scroll-box-wrap {
//       width: 100%;
//       overflow: auto;
//     }
//     .scroll-box {
//       display: flex;
//     }
//     .zh-text-item {
//       padding: 0 10px;
//       white-space: nowrap;
//       &.active {
//         color: orange;
//       }
//     }
//   }
//   span {
//     & + span {
//       margin-left: 5px;
//     }
//   }
// }
</style>