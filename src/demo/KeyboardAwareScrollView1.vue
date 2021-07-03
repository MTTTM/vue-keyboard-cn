<template>
  <div v-horizontal-screen="obj" class="horizontalScreen-demo-wrap1">
    <key-board-aware-scroll-view class="inner-wrap" id="innerWrap">
      <h2>KeyboardAwareScrollView components is scrollBox</h2>
      <ky-input
        v-model="mixValue"
        scrollWrap="#innerWrap"
        placeholder="Any string"
        :rotate="90"
      />

      <p>
        请滚到底部 scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <p>
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!! scrollToBottom!!!!!!!!!!!
        scrollToBottom!!!!!!!!!!!
      </p>
      <ky-input
        v-model="mixValue"
        placeholder="Any string"
        scrollWrap="#innerWrap"
        :rotate="90"
      />
      <key-board :emojiMap="emoji" :isHscreenApp="true" />
    </key-board-aware-scroll-view>
  </div>
</template>

<script>
import { person, hearts, symbo } from "../dev/emojiImages.js";
export default {
  name: "App",
  data() {
    return {
      emoji: {
        person,
        hearts,
        symbo,
      },
      mixValue: `hello,world!!`,
      obj: {
        width: 2001,
        height: 1125,
        cssVar: "hs-var",
        times: 3,
        adaptedCallback: "adaptedCallback", //Replace  window’s event hsAdapt
      },
    };
  },
  methods: {
    submitFn(val) {
      console.log("input 的submit事件", val);
    },
    showStatus(data) {
      console.log("监听键盘显示隐藏", data);
    },
    inputFn({ el, value }) {
      console.log("input", el, value);
    },
    focusFn({ el, value }) {
      console.log("focus", el, value);
    },
    blurFn({ el, value }) {
      console.log("blur", el, value);
    },
  },
};
</script>

<style lang="scss">
.horizontalScreen-demo-wrap1 {
  position: absolute;
  overflow: auto;
  left: 0;
  top: 0;
  .inner-wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
    position: absolute;
    z-index: 2;
    box-sizing: border-box;
    padding: 20px;
    li {
      &:nth-child(odd) {
        background: pink;
      }
    }
  }
}
</style>
