<template>
  <div class="vue-keyboard-cn-emoji-item">
    <span
      class="icon iconfont icon-smile vue-keyboard-cn-emoji-item-icon"
      v-if="!loaded"
    ></span>
    <div
      v-else
      :style="{ 'background-image': `url(${path})` }"
      class="vue-keyboard-cn-emoji-item-img"
    />
  </div>
</template>
<script>
export default {
  name: "emojiItem",
  props: {
    path: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  watch: {
    path: {
      handler(newV) {
        if (newV) {
          this.load(newV);
        }
      },
      immediate: true,
    },
  },
  methods: {
    load(newV) {
      let img = new Image();
      img.src = newV;
      img.onload = () => {
        this.loaded = true;
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.vue-keyboard-cn-emoji-item {
  position: relative;
  height: 50px;
}
.vue-keyboard-cn-emoji-item-img {
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
.vue-keyboard-cn-emoji-item-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 2;
  font-size: 30px;
  color: #999;
  text-align: center;
  line-height: 50px;
}
.vue-keyboard-cn-fade-enter-active,
.vue-keyboard-cn-fade-leave-active {
  transition: opacity 0.5s;
}
.vue-keyboard-cn-fade-enter, .vue-keyboard-cn-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>