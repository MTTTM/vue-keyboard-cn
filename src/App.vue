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
    <ky-input v-model="value" type="mix" />
    <p>int</p>
    <ky-input v-model="intValue" type="int" />
    <p>float</p>
    <ky-input v-model="floatValue" type="float" />
    <ky-input v-model="cnValue" type="cn" />
    <ky-input v-model="enValue" type="en" />
    <key-board :emojiMap="emoji" />
    <p v-html="value"></p>
    <p>指定 键盘</p>
    <!-- <ky-input
      v-model="floatValue"
      type="float"
      :keyBoard="$refs['secondKeyBoard']"
    />
    <key-board :emojiMap="emoji" ref="secondKeyBoard" /> -->
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
      intValue: "1099",
      floatValue: "1.99",
      cnValue: "你好啊",
      enValue: "helloguy",
    };
  },
};
</script>

<style>
</style>
