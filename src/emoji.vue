<template>
  <div class="emoji-wrap">
    <div class="emoj-wrap-body">
      <div class="emoj-wrap-body-inner">
        <div
          class="emoj-wrap-body-item"
          v-for="item in currEmojList"
          :key="item.key"
          @click.prevent.stop="appendItem(item)"
        >
          <div
            :style="{ 'background-image': `url(${item.path})` }"
            class="img"
          />
        </div>
      </div>
      <span
        class="emoji-delete icon iconfont icon-delete"
        @click.stop.prevent="deleteFn"
      ></span>
    </div>
    <div class="emoji-wrap-head">
      <div class="emoji-wrap-head-inner">
        <div
          :class="['emoji-wrap-head-item', key == item ? 'active' : '']"
          v-for="item in emojiKeys"
          :key="item"
          @click="setKey(item)"
        >
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
    setKey(item) {
      this.key = item;
    },
    appendItem(item) {
      this.$root.$emit(
        EventKeys["vue-keyboard-cn-append-item"],
        `<img src="${item.path}" class="emoji-icon icon-${item.key}"/>`
      );
    },
    deleteFn() {
      this.$root.$emit(EventKeys["vue-keyboard-cn-append-delete"]);
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
  position: relative;
  height: 208px;
  overflow: auto;
  .emoji-delete {
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 45px;
    height: 35px;
    color: #666;
    font-size: 35px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
  .emoj-wrap-body-inner {
    position: relative;
    max-height: 158px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px 50px;
  }
  .emoj-wrap-body-item {
    max-height: 50px;
    width: 12%;
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
  display: flex;
  align-items: center;
  background: #ecebeb;
  .emoji-wrap-head-inner {
    display: flex;
    align-items: center;
  }
  .emoji-wrap-head-item {
    padding: 0 10px;
    white-space: nowrap;
    &.active {
      color: orange;
    }
  }
}
</style>