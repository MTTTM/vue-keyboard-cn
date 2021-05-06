<template>
  <div id="app">
    <!-- <Keyboard :value="value" type="number" /> -->
    <p v-html="value"></p>
    <ky-input v-model="value" />
    <key-board :value="value" :emojiMap="emoji" />
  </div>
</template>

<script>
// import Keyboard from "./index";
import { person } from "./emojiImages.js";
export default {
  name: "App",
  data() {
    return {
      emoji: {
        person,
      },
      value: "4w",
    };
  },
};
</script>

<style>
</style>
