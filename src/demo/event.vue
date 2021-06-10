<template>
  <div>
    <p>focus,input,blur,submit events CallBack</p>
    <p>eventName:{{ eventName }}</p>
    <ky-input
      v-model="mixValue"
      placeholder="Any string"
      @input="inputFn"
      @focus="focusFn"
      @blur="blurFn"
      @submit="submitFn"
    />
    <key-board :emojiMap="emoji" />
    <div style="height: 800px"></div>
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
      eventName: "----",
      mixValue: `hello
,world!!`,
    };
  },
  methods: {
    submitFn(val) {
      this.eventName = "submit";
    },
    showStatus(data) {
      console.log("监听键盘显示隐藏", data);
    },
    inputFn({ el, value }) {
      this.eventName = "input";
    },
    focusFn({ el, value }) {
      this.eventName = "focus";
    },
    blurFn({ el, value }) {
      this.eventName = "blur";
    },
  },
};
</script>

<style>
p {
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
