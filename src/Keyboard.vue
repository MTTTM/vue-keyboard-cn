<template>
  <div>
    <div class="input" v-html="tmpValue">
      <!-- <span class="key-board-flash"></span> -->
    </div>
    <div class="key-board-box">
      <div class="key-board-box-head">
        <div class="key-board-box-head-op zh-text-list-box" v-if="showZhText">
          <div>{{ this.tmpPingying }}</div>
          <div class="scroll-box">
            <span
              v-for="(item, index) in zhSearchList"
              :key="item"
              :class="['zh-text-item', index == 0 ? 'active' : '']"
              @click="appendStringItem(item)"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="key-board-box-head-op" v-else>
          <span class="head-op-icon">头像</span>
          <span class="head-op-icon">键盘</span>
          <span class="head-op-icon">光标</span>
        </div>
      </div>
      <div class="key-board-box-body">
        <div
          class="key-board-box-item-wrap"
          v-for="(item, index) in keyboardMap"
          :key="index"
        >
          <div
            class="key-board-box-item"
            v-for="(el, i) in item"
            :key="index + '_' + i"
            @click="press(el)"
          >
            {{ getItemText(el) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ZH from "./zh";
export default {
  props: {
    type: {
      type: [String],
      required: false,
      default: "number", //zh,en,number
    },
    value: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      default: "zh",
    },
  },
  data() {
    return {
      pingyingMap: { ...ZH },
      tmpPingying: "", //临时中文输入
      valueArr: [],
      curr: "text",
      isLower: false,
      newLang: "",
      mainKeyBoardType: "",
      zhSearchList: [],
      numberMap: [
        [
          {
            text: "%",
          },
          {
            text: 1,
          },
          {
            text: 2,
          },
          {
            text: 3,
          },
          {
            text: "delete",
            zhText: "删除",
            enText: "delete",
            operate: "delete",
          },
        ],
        [
          {
            text: "+",
          },
          {
            text: "4",
          },
          {
            text: 5,
          },
          {
            text: 6,
          },
          {
            text: ".",
          },
        ],
        [
          {
            text: "-",
          },
          {
            text: 7,
          },
          {
            text: 8,
          },
          {
            text: 9,
          },
          {
            text: "@",
          },
        ],
        [
          {
            text: "/",
          },
          {
            text: "返回",
            zhText: "返回",
            enText: "back",
            operate: "back",
          },
          {
            text: 0,
          },
          {
            text: " ",
          },
          {
            text: "搜索",
            zhText: "搜索",
            enText: "search",
          },
        ],
      ],
      textMap: [
        [
          {
            text: "Q",
            isText: true,
          },
          {
            text: "W",
            isText: true,
          },
          {
            text: "E",
            isText: true,
          },
          {
            text: "R",
            isText: true,
          },
          {
            text: "T",
            isText: true,
          },
          {
            text: "Y",
            isText: true,
          },
          {
            text: "U",
            isText: true,
          },
          {
            text: "I",
            isText: true,
          },
          {
            text: "O",
            isText: true,
          },
          {
            text: "P",
            isText: true,
          },
        ],
        [
          {
            text: "A",
            isText: true,
          },
          {
            text: "S",
            isText: true,
          },
          {
            text: "D",
            isText: true,
          },
          {
            text: "F",
            isText: true,
          },
          {
            text: "G",
            isText: true,
          },
          {
            text: "H",
            isText: true,
          },
          {
            text: "J",
            isText: true,
          },
          {
            text: "K",
            isText: true,
          },
          {
            text: "L",
            isText: true,
          },
        ],
        [
          {
            text: "大写",
            zhText: "大写",
            enText: "capital",
            zhLowText: "小写",
            enLowText: "low",
            operate: "changeCapital",
          },
          {
            text: "Z",
            isText: true,
          },
          {
            text: "X",
            isText: true,
          },
          {
            text: "C",
            isText: true,
          },
          {
            text: "V",
            isText: true,
          },
          {
            text: "B",
            isText: true,
          },
          {
            text: "N",
            isText: true,
          },
          {
            text: "M",
            isText: true,
          },
          {
            text: "删除",
            zhText: "删除",
            enText: "delete",
            operate: "delete",
          },
        ],
        [
          {
            text: "符",
            zhText: "符",
            enText: "symbol",
            operate: "symbol",
          },
          {
            text: "123",
            operate: "changeNumber",
          },
          {
            text: ",",
            zhText: "，",
            enText: ",",
          },
          {
            text: " ",
          },
          {
            text: "。",
            zhText: "。",
            enText: ".",
          },
          {
            text: "中/英",
            operate: "changeLan",
            zhText: "中/英",
            enText: "zh/en",
          },
          {
            text: "搜索",
            operate: "search",
            zhText: "搜索",
            enText: "search",
          },
        ],
      ],
      cnSymbolMap: [
        [
          {
            text: "【",
          },
          {
            text: "】",
          },
          {
            text: "{",
          },
          {
            text: "}",
          },
          {
            text: "#",
          },
          {
            text: "%",
          },
          {
            text: "^",
          },
          {
            text: "*",
          },
          {
            text: "+",
          },
          {
            text: "=",
          },
        ],
        [
          {
            text: "_",
          },
          {
            text: "-",
          },
          {
            text: "\\",
          },
          {
            text: "|",
          },
          {
            text: "~",
          },
          {
            text: "@",
          },
          {
            text: "《",
          },
          {
            text: "》",
          },
          {
            text: "￥",
          },
          {
            text: "$",
          },
          {
            text: "&",
          },
          {
            text: ".",
          },
        ],
        [
          {
            text: "123",
            operate: "changeNumber",
          },
          {
            text: "...",
          },
          {
            text: ",",
          },

          {
            text: "^_^",
          },
          {
            text: "?",
          },
          {
            text: "!",
          },
          {
            text: "“",
          },
          {
            text: "”",
          },
          {
            text: "delete",
            zhText: "删除",
            enText: "delete",
            operate: "delete",
          },
        ],
        [
          {
            text: "返回",
            zhText: "返回",
            enText: "back",
            operate: "back",
          },
          {
            text: " ",
          },
          {
            text: "搜索",
            operate: "search",
            zhText: "搜索",
            enText: "search",
          },
        ],
      ],
    };
  },
  watch: {
    value: {
      handler(newV, oldV) {
        this.valueArr = this.value.split("");
        if (!oldV) {
          this.valueArr.push('<span class="key-board-flash"></span>');
        }
      },
      immediate: true,
    },
    tmpPingying() {
      let matchStr = this.pingyingMap[this.tmpPingying];
      if (matchStr) {
        this.zhSearchList = matchStr.split("");
      } else {
        this.zhSearchList = [];
      }
    },
  },
  computed: {
    tmpValue() {
      let t = "";
      this.valueArr.forEach((e) => {
        t += e;
      });
      return t;
    },
    keyboardMap() {
      return this[this.curr + "Map"];
    },
    showZhText() {
      return this.zhSearchList.length && this.newLang == "zh";
    },
  },
  mounted() {
    this.mainKeyBoardType = this.newLang = this.lang;
  },
  methods: {
    getItemText(el) {
      let end = el.text;
      if (el.operate == "changeCapital") {
        if (this.isLower) {
          end = el[`${this.newLang}LowText`];
          return end;
        }
      }
      if (el[this.newLang + "Text"]) {
        end = el[this.newLang + "Text"];
      }
      if (this.isLower) {
        end = String(end).toLowerCase();
      }
      return end;
    },
    computedZhSearhList() {},
    appendStringItem(text) {
      let len = this.valueArr.length - 1;
      this.$set(this.valueArr, len, text);
      this.valueArr.push('<span class="key-board-flash"></span>');
      this.tmpPingying = "";
    },
    press(val) {
      if (val.isText && this.newLang == "zh") {
        this.tmpPingying += val.text.toLowerCase();
        return;
      }
      if (!val.operate) {
        let text = this.getItemText(val);
        this.appendStringItem(text);
      } else {
        if (typeof this[val.operate + "Fn"] === "function") {
          this[val.operate + "Fn"](val);
        }
      }
    },
    deleteFn() {
      if (this.tmpPingying.length) {
        let len = this.tmpPingying.length - 1;
        this.tmpPingying = this.tmpPingying.slice(0, len);
      } else {
        let len = this.valueArr.length - 2;
        this.valueArr.splice(len, 2, '<span class="key-board-flash"></span>');
      }
    },
    changeLanFn() {
      if (this.newLang == "zh") {
        this.newLang = "en";
      } else {
        this.newLang = "zh";
      }
    },
    changeCapitalFn() {
      console.log("大小写");
      this.isLower = !this.isLower;
    },
    changeNumberFn() {
      this.curr = "number";
      this.tmpPingying = "";
    },
    backFn() {
      this.curr = "text";
      this.tmpPingying = "";
    },
    symbolFn() {
      this.curr = "cnSymbol";
      this.tmpPingying = "";
    },
    //
  },
};
</script>
<style lang="scss" >
.input {
  width: 600px;
  height: 300px;
  line-height: 30px;
  border: 1px solid #eee;
  padding: 5px;
  word-wrap: break-word;
}
@keyframes flash {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.key-board-flash {
  display: inline-block;
  width: 2px;
  height: 12px;
  background: red;
  animation: flash 0.3s infinite linear;
}
.key-board-box {
  height: 300p;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #eee;
  padding: 5px;
  user-select: none;
  .key-board-box-head {
    height: 50px;
    background: #eee;
  }
  .key-board-box-body {
  }
  .key-board-box-item-wrap {
    display: flex;
    & + .key-board-box-item-wrap {
      margin-top: 5px;
    }
  }
  .key-board-box-item {
    background: rgba(255, 255, 255, 0.6);
    opacity: 0.8;
    font-size: 14px;
    padding: 5px 10px;
    flex: 1;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-content: center;
    transition: 0.5s;
    color: #000;
    &:active {
      background: rgba(255, 255, 255, 1);
      opacity: 0.2;
      color: #666;
    }
    & + .key-board-box-item {
      margin-left: 5px;
    }
  }
}
.key-board-box-head-op {
  display: flex;
  justify-content: center;
  align-items: center;
  &.zh-text-list-box {
    justify-content: flex-start;
    flex-direction: column;
    .scroll-box {
      display: flex;
    }
    .zh-text-item {
      padding: 0 10px;
    }
  }
  span {
    & + span {
      margin-left: 5px;
    }
  }
  .zh-text-item {
    &.actice {
      color: orange;
    }
  }
}
</style>