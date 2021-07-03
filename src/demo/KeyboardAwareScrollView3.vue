<template>
  <key-board-aware-scroll-view class="inner-wrap">
    <h1>body scroll</h1>

    <ky-input v-model="mixValue" placeholder="Any string" :rotate="route" />

    <h2>true</h2>
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
    <ky-input v-model="mixValue" placeholder="Any string" :rotate="route" />
    <key-board :emojiMap="emoji" :isHscreenApp="true" />
  </key-board-aware-scroll-view>
</template>

<script>
import { person, hearts, symbo } from "../dev/emojiImages.js";
const route = -90;
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
      route: route,
      obj: {
        width: 2001,
        height: 1125,
        cssVar: "hs-var",
        times: 3,
        rotate: -90,
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

<style lang="scss" scoped>
</style>
