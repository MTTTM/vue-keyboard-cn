<template>
  <div id="app">
    <!-- <Keyboard :value="value" type="number" /> -->
    <div style="padding: 20px">
      111
      <img
        src="https://tpc.googlesyndication.com/daca_images/simgad/14840972809917267785"
        alt=""
        style="height: 10px; width: 20px"
      />dsfsdfds
    </div>
    <p v-html="value"></p>
    <p>默认不允许回车键，这种情况，回车会触发input的@submit按键</p>
    <ky-input
      v-model="value1"
      @submit="submitFn"
      @input="inputFn"
      @focus="focusFn"
      @blur="blurFn"
      class="hahahha"
      :allowEnter="true"
    />
    <!-- <ky-input
      v-model="value1"
      type="mix"
      @submit="submitFn"
      class="hahahha"
      inputLang="en"
    /> -->
    <p>开放回车</p>
    <!-- <ky-input v-model="value" type="mix" :allowEnter="true" /> -->
    <!-- <p>int</p>  -->
    <!-- <ky-input v-model="intValue" type="int" /> -->
    <!--<p>float</p>
    <ky-input v-model="floatValue" type="float" />
    <ky-input v-model="cnValue" type="cn" />
    <ky-input v-model="enValue" type="en" />
    -->
    <!-- <key-board :emojiMap="emoji" @show="showStatus" />
    <p v-html="value"></p> -->
    <p>指定 键盘</p>
    <!-- <ky-input
      v-model="floatValue"
      type="float"
      :keyBoard="$refs['secondKeyBoard']"
    /> -->
    <key-board :emojiMap="emoji" ref="secondKeyBoard" />
    <div style="height: 800px"></div>
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
p {
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
