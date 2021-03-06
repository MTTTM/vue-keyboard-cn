<template>
  <div class="emoji-wrap" ref="emojiWrap">
    <div class="emoj-wrap-body">
      <div
        class="emoj-wrap-body-inner"
        v-disabled-body-scroll="rotate"
        ref="scrollBox"
      >
        <div class="emoji-item-wrap">
          <div
            class="emoj-wrap-body-item"
            v-for="item in currEmojList"
            :key="item.key"
            @click.stop.prevent="appendItem(item)"
          >
            <EmojiItem :path="item.path" />
          </div>
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
          @click.stop.prevent="setKey(item)"
        >
          {{ emojiMap[item].text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EventKeys from "./eventKeys";
import EmojiItem from "./emojiItem";
export default {
  name: "emoji",
  components: { EmojiItem },
  props: {
    emojiMap: {
      type: Object,
      default: () => {},
    },
    getInputInfo: {
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
    //外层容器旋转，横屏app适用
    rotate() {
      return this.getInputInfo && this.getInputInfo.rotate
        ? this.getInputInfo.rotate
        : 0;
    },
  },
  created() {
    this.key = this.emojiKeys[0];
    this.scrollEvent = this.disabledItemClickEvent.bind(this);
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs["scrollBox"].addEventListener("scroll", this.scrollEvent);
      this.disabledItemClickEvent();
    });
  },
  beforeDestroy() {
    this.$refs["scrollBox"].removeEventListener("scroll", this.scrollEvent);
  },
  data() {
    return {
      key: 0,
      scrollEvent: null,
    };
  },

  methods: {
    getBoundingClientRect(el, attr) {
      return el && el.getBoundingClientRect()[attr];
    },
    disabledItemClickEvent(e) {
      let wrap = this.$refs["emojiWrap"];
      let items = wrap.querySelectorAll(".emoj-wrap-body-item");
      let deleteBtn = wrap.querySelector(".emoji-delete");
      let deleteBtnLeft = this.getBoundingClientRect(deleteBtn, "left");
      let deleteBtnTop = this.getBoundingClientRect(deleteBtn, "top");
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemLeft = this.getBoundingClientRect(item, "left");
        let itemTop = this.getBoundingClientRect(item, "top");
        item.classList.remove("disabled");
        if (
          deleteBtn &&
          Math.abs(deleteBtnLeft - itemLeft) <= 20 &&
          Math.abs(deleteBtnTop - itemTop) <= 30
        ) {
          item.classList.add("disabled");
        }
      }
    },
    setKey(item) {
      this.key = item;
      if (this.$refs["scrollBox"]) {
        this.$refs["scrollBox"].scrollTo(0, 0);
      }
    },
    appendItem(item) {
      this.$root.$emit(
        EventKeys["vue-keyboard-cn-append-item"],
        `<img attr-img=""vue-keyboard-cn-emoji" class=" emoji-icon icon-${item.key}" src="${item.path}" />`
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
  flex: 1;
  position: relative;
}

.emoj-wrap-body {
  flex: 1;
  position: relative;

  .emoj-wrap-body-inner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    // touch-action: pan-y;
    user-select: none;
  }
  .emoji-item-wrap {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 50px;
  }
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
    z-index: 9999;
  }

  .emoj-wrap-body-item {
    max-height: 50px;
    width: 12%;
    height: 50px;
    background-position: center center;
    background-size: contain;
    margin-bottom: 5px;
    &.disabled {
      opacity: 0.2;
      pointer-events: none;
    }

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
  position: relative;
  z-index: 20;
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