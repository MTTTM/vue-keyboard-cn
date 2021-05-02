<template>
  <div>
    <div class="input" v-html="tmpValue">
      <!-- <span class="key-board-flash"></span> -->
    </div>
    <div class="key-board-box">
      <div class="key-board-box-head">
        <div class="key-board-box-head-op zh-text-list-box" v-if="showZhText">
          <!-- <div>{{ this.tmpPingying }}</div> -->
          <div>
            <span v-for="(item, index) in showZhMatchArr" :key="index">{{
              item
            }}</span>
          </div>
          <div class="scroll-box">
            <span
              v-for="(item, index) in zhSearchList"
              :key="item + index"
              :class="['zh-text-item', index == 0 ? 'active' : '']"
              @click="clickCnTextItem(item)"
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
            :class="['key-board-box-item', el.operate ? 'fn-text' : '']"
            v-for="(el, i) in item"
            :key="index + '_' + i"
            @click="press(el)"
          >
            <span>{{ getItemText(el) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ZH from "./zh";
import boardMaps from "./boardMaps";
const zhKeys = Object.keys(ZH);
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
      ...boardMaps,
      zhKeys,
      selectedTextArr: [], //中文已选，待填入的字
      matchedKeyArr: [], //匹配到的key集合
      matchedKeyArrSelectedIndex: 0, //已匹配拼音key对应的索引
      showZhMatchArr: [], //展示的选中后的中文和未选中的拼音
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
        this.showZhMatchArr = [];
        this.zhSearchList = matchStr.split("");
      } else {
        let matchResult = [];
        for (let i = 0; i < this.zhKeys.length - 1; i++) {
          let item = this.zhKeys[i];
          let index = this.tmpPingying.indexOf(item);
          matchResult.push({
            index,
            key: item,
          });
        }
        matchResult = matchResult.filter((el) => el.index != -1);
        let group = {};
        matchResult.forEach((item) => {
          if (!group[item.index]) {
            group[item.index] = [];
          }
          group[item.index].push(item);
        });
        let groupKeysArray = Object.keys(group);
        let endMatchPingying = [];
        groupKeysArray.forEach((item) => {
          let itemArr = group[item];
          let maxLen = 0;
          itemArr.forEach((subItem) => {
            if (subItem.key.length > maxLen) {
              maxLen = subItem.key.length;
              endMatchPingying[Number(subItem.index)] = subItem;
            }
          });
        });
        let pingyingFilter = [];
        endMatchPingying.forEach((item, index) => {
          let prevItem = endMatchPingying[index - 1];
          if (prevItem) {
            if (prevItem.index + prevItem.key.length <= item.index) {
              pingyingFilter.push(item);
            }
          } else {
            pingyingFilter.push(item);
          }
        });
        this.matchedKeyArr = pingyingFilter;
        this.showZhMatchArr = this.matchedKeyArr.map((item) => item.key);
        // console.log("matchResult",matchResult)
        console.log("endMatchPingying", pingyingFilter);
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
      return this.tmpPingying.length && this.newLang == "zh";
    },
  },
  mounted() {
    this.mainKeyBoardType = this.newLang = this.lang;
    console.log("zhKeys", this.zhKeys);
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
    clickCnTextItem(text) {
      if (this.matchedKeyArr.length == 0) {
        this.appendStringItem(text);
      } else if (
        this.matchedKeyArrSelectedIndex >=
        this.matchedKeyArr.length - 1
      ) {
        this.showZhMatchArr[this.matchedKeyArrSelectedIndex] = text;
        let textStr = this.showZhMatchArr.reduce((a, b) => a + b, "");
        this.appendStringItem(textStr);
      } else {
        this.showZhMatchArr[this.matchedKeyArrSelectedIndex] = text;
        this.showZhMatchArr = [...this.showZhMatchArr];
        this.matchedKeyArrSelectedIndex++;

        let matchStr = this.pingyingMap[
          this.showZhMatchArr[this.matchedKeyArrSelectedIndex]
        ];
        if (matchStr) {
          this.zhSearchList = matchStr.split("");
        }

        console.log(" this.showZhMatchArr", this.showZhMatchArr);
      }
    },
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
    searchFn() {
      if (
        this.curr === "text" &&
        this.zhSearchList.length &&
        this.newLang == "zh"
      ) {
        this.appendStringItem(this.zhSearchList[0]);
        this.tmpPingying = "";
      }
      return;
    },
    //
  },
};
</script>
<style lang="scss" >
.input {
  max-width: 600px;
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
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #eee;
  padding: 5px;
  user-select: none;
  box-sizing: border-box;
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
    padding: 5px 0;
    height: 30px;
    flex: 1;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-content: center;
    transition: 0.5s;
    color: #000;
    span {
      line-height: 30px;
      font-size: 14px;
      white-space: nowrap;
    }
    &.fn-text {
      span {
        font-size: 12px;
      }
    }
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
    align-items: flex-start;
    flex-direction: column;
    .scroll-box {
      display: flex;
    }
    .zh-text-item {
      padding: 0 10px;
      &.active {
        color: orange;
      }
    }
  }
  span {
    & + span {
      margin-left: 5px;
    }
  }
}
</style>