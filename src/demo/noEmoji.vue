<template>
  <div>
    <h1>keyboard no props emojiMap</h1>

    <h2>default {}</h2>
    <p v-html="mixValue"></p>
    <ky-input
      v-model="mixValue"
      placeholder="Any string"
      :showFixedInput="true"
      :allowEnter="true"
    />
    <key-board />
    <div style="height: 800px"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
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
