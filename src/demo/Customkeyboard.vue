<template>
  <div>
    <p>key-board props disabledInputUpdateMixKeyBoardLang</p>
    <p>default false</p>
    <ky-input
      v-model="mixValue"
      placeholder="default key board"
      type="float"
      :keyBoard="$refs['allowChange']"
    />
    <ky-input
      v-model="mixValue"
      placeholder="custom key board"
      type="float"
      :keyBoard="$refs['disabledChange']"
    />

    <key-board :emojiMap="emoji" ref="allowChange" />

    <key-board
      :emojiMap="emoji"
      ref="disabledChange"
      :keyBoardMaps="keyBoardMaps"
    />
    <div style="height: 800px"></div>
  </div>
</template>

<script>
import { person, hearts, symbo } from "../dev/emojiImages.js";
import keyBoardMaps from "./customKeyboardMap/boardMaps";
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
      keyBoardMaps,
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
