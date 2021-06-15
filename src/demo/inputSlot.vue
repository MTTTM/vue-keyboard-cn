<template>
  <div>
    <p>input props maxLength</p>
    <ky-input
      v-model="mixValue"
      placeholder="max length 3"
      :maxLength="3"
      type="int"
      :showFixedInput="true"
    >
      <template v-slot:prepend>
        <span class="btn-dosomething" @click="dosomething(0)">-</span>
      </template>
      <template v-slot:append>
        <span class="btn-dosomething" @click="dosomething(1)">+</span>
      </template>
      <!-- fixed input slot -->
      <template v-slot:prependFixed>
        <span class="btn-dosomething" @click="dosomething(0)">-</span>
      </template>
      <template v-slot:appendFixed>
        <span class="btn-dosomething" @click="dosomething(1)">+</span>
      </template>
    </ky-input>

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
      mixValue: 1,
    };
  },
  methods: {
    dosomething(type = 1) {
      if (type == 0) {
        if (this.mixValue > 0) {
          this.mixValue--;
        }
      } else {
        this.mixValue++;
      }
    },
    submitFn(val) {
      this.eventName = "submit";
    },
    showStatus(data) {
      console.log("监听键盘显示隐藏", data);
    },
    inputFn({ el, value }) {
      this.eventName = "input";
    },
    focusFn({ el, value }) {
      this.eventName = "focus";
    },
    blurFn({ el, value }) {
      this.eventName = "blur";
    },
  },
};
</script>

<style  scoped>
p {
  word-wrap: break-word;
  white-space: pre-wrap;
}
.btn-dosomething {
  display: block;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-keyboard-input-fixed-wrap .btn-dosomething {
  font-weight: bold;
  font-size: 22px;
}
</style>
