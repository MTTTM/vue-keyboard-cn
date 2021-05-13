<template>
  <div class="operation-wrap" @touchstart.stop>
    <div class="operation-wrap-left">
      <div class="operation-wrap-left-pancel">
        <!-- 上下 -->
        <span
          class="operation-btn operation-btn-top icon iconfont icon-bg-next"
          @click.stop.prevent="cursorMove('top')"
        >
        </span>
        <span
          class="operation-btn operation-btn-btm icon icon iconfont icon-bg-next"
          @click.stop.prevent="cursorMove('bottom')"
        ></span>
        <!-- 左右 -->
        <span
          class="operation-btn operation-btn-left icon iconfont icon-arrow-left-filling"
          @click.stop.prevent="cursorMove('left')"
        ></span>
        <span
          class="operation-btn operation-btn-right icon iconfont icon-arrow-right-filling"
          @click.stop.prevent="cursorMove('right')"
        ></span>
      </div>
    </div>
    <div class="operation-wrap-right">
      <div class="operation-wrap-right-inner">
        <div class="operation-wrap-right-item" @click.stop.prevent="selectAll">
          全选
        </div>
        <!-- <div
          
          v-clipboard:copy="inputValue"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          复制
        </div> -->
        <div class="operation-wrap-right-item" @click="onCopyCallback">
          复制
        </div>
        <div class="operation-wrap-right-item" @click.stop.prevent="paste">
          粘贴
        </div>
      </div>
      <div class="operation-wrap-right-inner">
        <div
          class="operation-wrap-right-item icon iconfont icon-delete"
          @touchstart.stop.prevent
          @touchend.stop.prevent="deleteFn"
        ></div>
        <div class="operation-wrap-right-item icon iconfont icon-enter"></div>
        <div
          class="operation-wrap-right-item"
          @click.stop.prevent="showCopyBox = true"
        >
          剪切板
        </div>
      </div>
    </div>
    <!-- 复制提示toast -->
    <div :class="['operation-toast', showToast ? 'active' : '']">
      <span>{{ toastText }}</span>
    </div>
    <!-- 剪切板 -->
    <div class="copy-box-show" v-if="showCopyBox" @touchmove.stop>
      <div class="copy-box-show-inner">
        <div
          class="p"
          v-for="(item, index) in copyTextArray"
          :key="index"
          @click.stop.prevent="pasteItem(item)"
        >
          <div v-html="item"></div>
          <span class="close" @click.stop.prevent="removeFn(index)">x</span>
        </div>
        <div style="height: 50px"></div>
      </div>
      <span
        class="copy-back icon iconfont icon-delete"
        @click="showCopyBox = false"
      ></span>
    </div>
  </div>
</template>
<script>
import EventKeys from "./eventKeys";
import { getCopyLocalStorage, nativeCopyString } from "./copyPaste.js";
let timer;
export default {
  data() {
    return {
      isselectAll: false,
      toastText: "",
      showToast: false,
      copyTextArray: [],
      showCopyBox: false,
    };
  },
  props: {
    inputValue: {
      type: String,
      required: true,
    },
  },
  created() {
    this.getCopyLocalStorage();
    // //监听原生复制
    this.$root.$on(
      EventKeys["vue-keyboard-cn-natice-copy"],
      this.nativeCopyRead
    );
  },
  beforeDestroy() {
    this.$root.$off(
      EventKeys["vue-keyboard-cn-natice-copy"],
      this.nativeCopyRead
    );
  },
  methods: {
    cursorMove(str) {
      this.$root.$emit(EventKeys["vue-keyboard-cn-cursor-move"], str);
    },
    nativeCopyRead() {
      //this.appendCopyArrayItem(str);
      setTimeout(() => {
        this.getCopyLocalStorage();
      });
    },
    pasteItem(text) {
      this.appendStringItem(text);
    },
    paste() {
      if (this.copyTextArray && this.copyTextArray[0]) {
        this.appendStringItem(this.copyTextArray[0]);
        this.toastText = "粘贴成功";
        this.showToast = true;
        clearTimeout(timer);
        timer = setTimeout(() => (this.showToast = false), 1500);
      } else {
        this.toastText = "没有粘贴的文字";
        this.showToast = true;
        clearTimeout(timer);
        timer = setTimeout(() => (this.showToast = false), 1500);
      }
    },
    appendStringItem(text) {
      this.tmpPingying = "";
      this.$root.$emit(EventKeys["vue-keyboard-cn-append-item"], text);
    },
    removeFn(index) {
      this.copyTextArray.splice(index, 1);
      this.saveCopyLocalStorage();
    },
    saveCopyLocalStorage() {
      localStorage.setItem(
        "vue-keyboard-copy",
        JSON.stringify(this.copyTextArray)
      );
    },
    getCopyLocalStorage() {
      this.copyTextArray = getCopyLocalStorage();
      console.log("this.copyTextArray", this.copyTextArray);
    },
    deleteFn() {
      this.$root.$emit(EventKeys["vue-keyboard-cn-append-delete"]);
    },
    selectAll() {
      if (!this.inputValue.length) {
        return;
      }
      this.$root.$emit(EventKeys["vue-keyboard-cn-select-all"], true);
    },
    appendCopyArrayItem(str) {
      //限制只存20条
      if (this.copyTextArray.length > 20) {
        this.copyTextArray.pop();
      }
      this.copyTextArray.unshift(str);
    },
    onCopyCallback() {
      let copyText = nativeCopyString(this.inputValue);
      if (copyText) {
        this.onCopy({ e: copyText });
      } else {
        this.onError();
      }
    },
    onCopy() {
      this.toastText = "复制成功";
      this.showToast = true;
      //因为触发的是原生的复制事件，所以不要再这里再处理一遍
      clearTimeout(timer);
      timer = setTimeout(() => (this.showToast = false), 1500);
    },
    //复制失败的回调
    onError() {
      this.toastText = "复制失败";
      this.showToast = true;
      clearTimeout(timer);
      timer = setTimeout(() => (this.showToast = false), 1500);
    },
  },
};
</script>
<style lang="scss" >
.operation-wrap {
  height: 230px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .copy-tip {
    color: #999;
    text-align: center;
    font-size: 12px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 5px;
  }
  .operation-toast {
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 14px;
    display: block;
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    z-index: 20;
    max-width: 0;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    border-radius: 8px;
    transition: 0.5s;
    span {
      padding: 7px 10px;
      display: inline-block;
      white-space: nowrap;
    }
    &.active {
      opacity: 1;
      max-width: 140px;
      max-height: 40px;
    }
  }
  .operation-wrap-left {
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .operation-wrap-right {
    flex: 1;
    display: flex;

    .operation-wrap-right-inner {
      width: 50%;
    }

    .operation-wrap-right-item {
      width: 60px;
      height: 40px;
      background: rgba(255, 255, 255, 0.7);
      color: #333;
      border-radius: 4px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      & + .operation-wrap-right-item {
        margin-top: 10px;
      }
      &.iconfont,
      .iconfont {
        font-size: 25px;
      }
      &:active {
        color: #000;
        background: rgba(255, 255, 255, 1);
      }
    }
  }
  .copy-box-show {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;

    left: 0;
    bottom: 0;
    background: #eee;
    overflow: auto;
    .copy-box-show-inner {
      width: 100%;
      height: 100%;
      overflow: auto;
      p {
        position: relative;
        padding-right: 40px;
      }
      .close {
        display: inline-block;
        padding: 10px;
        position: absolute;
        font-size: 16px;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #666;
      }
    }
    .copy-back {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 45px;
      height: 35px;
      color: #666;
      font-size: 35px;
      font-weight: normal;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);
    }
    .p {
      line-height: 40px;
      background: rgba(255, 255, 255, 0.7);
      color: #333;
      border-radius: 4px;
      margin: 0 5px 5px;
      padding: 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      display: flex;
      align-items: center;
      .emoji-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
  .operation-wrap-left-pancel {
    position: relative;
    width: 130px;
    height: 130px;
    border-radius: 100%;
    border: 1px solid #999;
  }
  .operation-btn {
    position: absolute;
    width: 40px;
    height: 40px;
    color: #666;
    font-size: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    &:active {
      color: #000;
    }
    .operation-btn-top-line {
      &::before {
        content: "";
        display: block;
        width: 15px;
        height: 1px;
        background: #333;
      }
    }
  }
  .operation-btn-top {
    left: 50%;
    transform: translateX(-50%) rotate(-90deg);
    top: 5px;
    font-size: 24px;
  }
  .operation-btn-btm {
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
    bottom: 5px;
    font-size: 24px;
  }
  .operation-btn-left {
    top: 50%;
    transform: translateY(-50%);
    left: 5px;
  }
  .operation-btn-right {
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
  }
}
</style>