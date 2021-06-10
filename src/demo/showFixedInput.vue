<template>
  <div>
    <h1>input props showFixedInput</h1>

    <h2>default false</h2>
    <p v-html="mixValue"></p>
    <ky-input v-model="mixValue" placeholder="Any string" />

    <h2>true</h2>
    <p v-html="mixValue"></p>
    <ky-input
      v-model="mixValue"
      placeholder="Any string"
      :showFixedInput="true"
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
