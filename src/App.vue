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
    <ky-input v-model="value" />
    <ky-input v-model="numberValue" type="number" />
    <ky-input v-model="cnValue" type="cn" />
    <ky-input v-model="enValue" type="en" />
    <key-board :value="value" :emojiMap="emoji" />
    <div style="height: 800px"></div>
  </div>
</template>

<script>
// import Keyboard from "./index";
import { person, hearts, symbo } from "./emojiImages.js";
export default {
  name: "App",
  data() {
    return {
      emoji: {
        person,
        hearts,
        symbo,
      },
      value: "4w000000000102",
      numberValue: "1099",
      cnValue: "你好啊",
      enValue: "helloguy",
    };
  },
};
</script>

<style>
</style>
