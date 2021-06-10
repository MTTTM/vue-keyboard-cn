<template>
  <div>
    <h1>props type</h1>
    <h2>default mix</h2>
    <p v-html="mixValue"></p>
    <ky-input v-model="mixValue" placeholder="Any string" />
    <h2>int</h2>
    <p v-html="intValue"></p>
    <ky-input v-model="intValue" placeholder="only int" type="int" />
    <h2>float</h2>
    <p v-html="floatValue"></p>
    <ky-input
      v-model="floatValue"
      placeholder="
2 decimal places"
      type="float"
    />

    <h2>cn</h2>
    <p v-html="cnValue"></p>
    <ky-input v-model="cnValue" placeholder="chinese" type="cn" />

    <h2>en</h2>
    <p v-html="envalue"></p>
    <ky-input v-model="envalue" placeholder="english" type="en" />

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
      intValue: "1",
      floatValue: "1.22",
      cnValue: "鼓励·拿扎",
      envalue: "hellogg",
      mixValue: "你好啊,world!!",
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
