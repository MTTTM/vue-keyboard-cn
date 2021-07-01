<template>
  <div>
    <h1>word when props allowEntr is true</h1>

    <h2>default true</h2>
    <!-- <p v-html="mixValue"></p> -->
    <ky-input
      v-model="mixValue1"
      placeholder="Any string"
      :allowEnter="true"
      inputLang="en"
    />

    <h6
      style="
        line-height: 1.4;
        margin: 0;
        margin-block-start: 0;
        margin-block-end: 0;
      "
    >
      height="80px"
    </h6>
    <p style="margin: 0; padding: 0; font-size: 12px">
      If the height is fixed, diplay must be set to block, otherwise scrolltop
      will be set to 0, but in fact it does not scroll to the top
    </p>
    <!-- <p v-html="mixValue"></p> -->
    <!-- If the height is fixed, diplay must be set to block, 
    otherwise scrolltop will be set to 0, but in fact it does not scroll to the top -->
    <ky-input
      v-model="mixValue"
      placeholder="Any string"
      height="80px"
      :allowEnter="true"
      inputLang="en"
      id="aa"
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
      mixValue: `hello
,world!!

123
234`,
      mixValue1: `hello
,world!!`,
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

<style>
p {
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
