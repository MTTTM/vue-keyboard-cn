<template>
  <div>
    <p>input props maxLength</p>
    <ky-input
      v-model="mixValue"
      placeholder="max length 3"
      :maxLength="3"
      type="en"
      ref="inputElement"
    />
    <button @click.stop="selectFuc">select</button>
    <button @click.stop="unselectFuc">unSelect</button>
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
      mixValue: `ab`,
    };
  },
  methods: {
    selectFuc() {
      this.$refs["inputElement"].select();
    },
    unselectFuc() {
      this.$refs["inputElement"].unSelect();
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
