<template>
  <div id="app">
    <!-- <Keyboard :value="value" type="number" /> -->
    <input type="text" value="fasdfsdfdfsdfsdsdfa" />
    <p v-html="value"></p>
    <ky-input v-model="value" />
    <key-board :value="value" :emojiMap="emoji" />
    <div style="height: 899px"></div>
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
      value: "4w0000000000",
    };
  },
};
</script>

<style>
</style>
