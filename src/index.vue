<template>
  <div
    :class="['key-board-box', screenDir == 1 ? 'hs-key-board-box' : '']"
    v-show="show"
    ref="key-board-box"
  >
    <div class="key-board-box-head-op" @touchstart.stop>
      <!-- 键盘设置列表 -->
      <span
        class="head-op-icon"
        v-for="(item, index) in operationList"
        :key="item.id"
        @click.prevent.stop="operateBtnFn(index, item)"
        :class="[
          operationActiveIndex == index ? 'active' : '',
          isDisabled(item) ? 'disabled' : '',
        ]"
      >
        <span :class="item.classs"></span>
      </span>
    </div>
    <component
      v-bind:is="currentView"
      :emojiMap="emojiMap"
      :inputValue="value"
      :getInputInfo="getInputInfo"
      @show="triggerShow"
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
      default: "cn", //number,zh,cn //展示键盘输入方式，默认中文，如果是number就无法切换成其他输入法
    },
    showEmoji: {
      type: Boolean,
      default: () => false,
    },
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
      operationActiveIndex: 0, //切换列表高亮索引
      operationList: [
        {
          classs: "icon iconfont icon-keyboard-26",
          id: 1,
        },
        {
          classs: "icon iconfont icon-smile",
          id: 2,
          type: "smile",
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
      getInputInfo: {}, //当前获取焦点的input的信息
    };
  },
  computed: {
    isMix() {
      return this.getInputInfo && this.getInputInfo.type === "mix";
    },
  },
  watch: {
    show: {
      handler(newV) {
        this.fixedBg();
        this.$nextTick(() => {
          this.$emit("show", {
            show: newV,
            el: this.$refs["key-board-box"],
          });
        });
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
    this.changeView();
    this.$root.$on(EventKeys["vue-keyboard-cn-focus"], (data) => {
      console.log("获取焦点！！！！！键盘");
      //这个所有键盘都会受到影响！！
      let { isFocus, tmpValueNoFlash } = data;
      this.show = isFocus;
      this.value = tmpValueNoFlash; //直接引用
      this.getInputInfo = data;
      this.changeView("board");
      this.operationActiveIndex = 0;
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
    triggerShow(bool) {
      this.show = bool;
    },
    isDisabled(item) {
      if (item && item.type === "smile" && !this.isMix) {
        return true;
      } else {
        return false;
      }
    },
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
      //如果没有显示，直接过滤
      if (!this.show) {
        return;
      }
      if (!str) {
        return;
      }
      onNaticeCopyEvent(str); //已经做去重处理
    },
    changeView(path = "board") {
      this.currentView = path;
    },
    operateBtnFn(index, item) {
      if (this.isDisabled(item)) {
        return;
      }
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
      // if (this.show) {
      //   this.top = window.scrollY;
      //   this.bodyEl.style.position = "fixed";
      //   this.bodyEl.style.top = -top + "px";
      //   this.bodyEl.style.width = "100%";
      // } else {
      //   this.bodyEl.style.position = "";
      //   this.bodyEl.style.top = "";
      //   window.scrollTo(0, top); // 回到原先的top
      // }
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
* {
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

.icon-back:before {
  content: "\e8f4";
}

.icon-back1:before {
  content: "\e601";
}

.icon-editor-to-capitalize:before {
  content: "\e96b";
}

.icon-editor-to-lowercase:before {
  content: "\e96c";
}

.icon-Spacebar:before {
  content: "\e6d8";
}

.icon-theearth2diqiu:before {
  content: "\e62a";
}

.icon-bg-next:before {
  content: "\e649";
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
    height: 50px;
    background: #eee;
  }
  .icon-route {
    transform: rotate(90deg);
  }
}
</style>