<template>
  <div>
    <p>input props maxLength</p>
    <ky-input
      v-model="mixValue"
      placeholder="max length 3"
      :maxLength="3"
      type="en"
      :disabled="true"
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
      mixValue: `ab`,
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
