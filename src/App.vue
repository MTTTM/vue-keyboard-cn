<template>
  <div id="app">
    <h2 class="header">
      <router-link class="nav-link" to="/home"> < Home</router-link>
    </h2>
    <router-view></router-view>
  </div>
</template>

<script>
import { person, hearts, symbo } from "./dev/emojiImages.js";
export default {
  name: "App",
  data() {
    return {
      emoji: {
        person,
        hearts,
        symbo,
      },
      value1: "",
      value: "4w000000000102\r\n999",
      intValue: "1099",
      floatValue: "1.99",
      cnValue: "你好啊",
      enValue: "helloguy",
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
.header {
  position: sticky;
  top: 10px;
  background: #fff;
  z-index: 999;
  border-bottom: 1px solid #eee;
}
h1 {
  border-bottom: 1px solid #999;
  margin-bottom: 10px;
  padding: 5px 0;
}
li {
  padding-left: 10px;
  line-height: 30px;
}
.hljs {
  display: block;
}
code {
  width: 100%;
  overflow: auto;
}
</style>


