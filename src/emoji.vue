<template>
  <div class="emoji-wrap">
    <div class="emoj-wrap-body">
      <div
        class="emoj-wrap-body-item"
        v-for="item in currEmojList"
        :key="item.key"
        @click="appendItem(item)"
      >
        <div :style="{ 'background-image': `url(${item.path})` }" class="img" />
      </div>
    </div>
    <div class="emoji-wrap-head">
      <div class="emoji-wrap-head-inner">
        <div class="emoji-wrap-head-item" v-for="item in emojiKeys" :key="item">
          {{ emojiMap[item].text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EventKeys from "./eventKeys";
export default {
  props: {
    emojiMap: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    emojiKeys() {
      return Object.keys(this.emojiMap);
    },
    currEmojList() {
      return this.emojiMap[this.key].list;
    },
  },
  created() {
    console.log("this.emoji", this.emojiMap);
    this.key = this.emojiKeys[0];
  },
  data() {
    return {
      key: 0,
    };
  },
  methods: {
    appendItem(item) {
      this.$root.$emit(
        EventKeys["vue-keyboard-cn-append-item"],
        `<span style="background-image: url(${item.path})" class="emoji-icon icon-${item.key}"></span>`
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.emoji-wrap {
  display: flex;
  flex-direction: column;
}
.emoj-wrap-body {
  height: 208px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  .emoj-wrap-body-item {
    max-height: 50px;
    width: 10%;
    height: 50px;
    background-position: center center;
    background-size: contain;
    margin-bottom: 5px;
    .img {
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
    }
  }
}
.emoji-wrap-head {
  height: 40px;
  width: 100%;
  overflow: auto;
  .emoji-wrap-head-inner {
    display: flex;
    align-items: center;
  }
  .emoji-wrap-head-item {
    padding: 0 10px;
  }
}
</style>