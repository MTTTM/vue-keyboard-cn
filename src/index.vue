<template>
  <div>
    <div class="key-board-box" v-show="show">
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
      <component v-bind:is="currentView" :emojiMap="emojiMap"></component>
    </div>
  </div>
</template>
<script>
import Board from "./board.vue";
import Emoji from "./emoji.vue";
import Operation from "./operation.vue";
import EventKeys from "./eventKeys";
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
          classs: "icon iconfont icon-arrow-down-filling",
          id: 4,
        },
      ],
    };
  },

  mounted() {
    this.changeView();
    this.$root.$on(EventKeys["vue-keyboard-cn-focus"], (data) => {
      let { isFocus } = data;
      this.show = isFocus;
      //this.valueArr = value; //直接引用
    });
    //监听键盘关闭事件
    this.$root.$on(EventKeys["vue-keyboard-cn-show"], (bool) => {
      this.show = bool;
    });
    this.operateBtnFn(this.operationActiveIndex);
  },
  methods: {
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

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

.icon-arrow-up-filling:before {
  content: "\e688";
}

.icon-arrow-down-filling:before {
  content: "\e689";
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
  height: 300px;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #eee;
  padding: 5px 0;
  user-select: none;
  box-sizing: border-box;
  .key-board-box-head {
    height: 50px;
    background: #eee;
  }
  .key-board-box-body {
  }
  .key-board-box-item-wrap {
    display: flex;
    & + .key-board-box-item-wrap {
      margin-top: 5px;
    }
  }
  .key-board-box-item {
    background: rgba(255, 255, 255, 0.6);
    opacity: 0.8;
    font-size: 14px;
    padding: 5px 0;
    height: 30px;
    flex: 1;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-content: center;
    transition: 0.5s;
    color: #000;
    span {
      line-height: 30px;
      font-size: 14px;
      white-space: nowrap;
    }
    &.fn-text {
      span {
        font-size: 12px;
      }
    }
    &:active {
      background: rgba(255, 255, 255, 1);
      opacity: 0.2;
      color: #666;
    }
    & + .key-board-box-item {
      margin-left: 5px;
    }
  }
}
.key-board-box-head-op {
  display: flex;
  justify-content: center;
  align-items: center;
  .head-op-icon {
    height: 40px;
    font-size: 14px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      color: orange;
    }
  }
  &.zh-text-list-box {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    .scroll-box-wrap {
      width: 100%;
      overflow: auto;
    }
    .scroll-box {
      display: flex;
    }
    .zh-text-item {
      padding: 0 10px;
      white-space: nowrap;
      &.active {
        color: orange;
      }
    }
  }
  span {
    & + span {
      margin-left: 5px;
    }
  }
}
</style>