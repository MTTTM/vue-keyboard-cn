<template>
  <div>
    <p>key-board props disabledInputUpdateMixKeyBoardLang</p>
    <p>default false</p>
    <ky-input
      v-model="mixValue"
      placeholder="no allow change "
      inputLang="en"
      :keyBoard="$refs['allowChange']"
    />
    <ky-input
      v-model="mixValue"
      placeholder="allow change "
      inputLang="en"
      :keyBoard="$refs['disabledChange']"
    />

    <key-board :emojiMap="emoji" ref="allowChange" />

    <key-board
      :emojiMap="emoji"
      ref="disabledChange"
      :disabledInputUpdateMixKeyBoardLang="true"
    />
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
      mixValue: ``,
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
