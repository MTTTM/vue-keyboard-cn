<template>
  <div class="key-board-box-wrap">
    <div class="key-board-box-head" v-if="showZhText">
      <div class="key-board-box-head-op zh-text-list-box" v-if="showZhText">
        <!-- 展示拼音输入和已选择中文的区域 -->
        <div class="pingying-box">
          <span v-for="(item, index) in showZhMatchArr" :key="index">{{
            zhSelectedAreaItem(item, index)
          }}</span>
        </div>
        <!-- 展示待选择的中文列表 -->
        <div class="scroll-box-wrap">
          <div class="scroll-box">
            <!-- 用户曾经输入的词列表 -->
            <template v-if="showzhMemoryResult">
              <span
                v-for="(item, index) in zhMemoryResult"
                :key="item.zh + index"
                :class="['zh-text-item', index == 0 ? 'active' : '']"
                @click.stop.prevent="clickCnTextItemObj(item)"
                >{{ item.zh }}</span
              >
            </template>
            <!-- 单字，可选列表 -->
            <span
              v-for="(item, index) in zhSearchList"
              :key="item + index"
              :class="['zh-text-item', index == 0 ? 'active' : '']"
              @click.stop.prevent="clickCnTextItem(item)"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="key-board-box-body">
      <div
        class="key-board-box-item-wrap"
        v-for="(item, index) in keyboardMap"
        :key="index"
      >
        <template v-for="(el, i) in item">
          <div
            :class="[
              'key-board-box-item',
              el.operate ? 'fn-text' : '',
              canSwitchOther(el) ? '' : 'key-board-box-item-disabled',
            ]"
            :key="index + '_' + i"
            @touchstart.stop.prevent="press(el)"
          >
            <span>{{ getItemText(el) }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import ZH from "./zh";
import boardMaps from "./boardMaps";
const zhKeys = Object.keys(ZH);
import { getPingMatchObjKey } from "./tools.js";
import { matchHotPingying, setPingying } from "./memory.js";
import EventKeys from "./eventKeys";
export default {
  props: {
    type: {
      type: [String],
      required: false,
      default: "number", //zh,en,number
    },
    // value: {
    //   type: String,
    //   required: true,
    // },
    lang: {
      type: String,
      default: "zh",
    },
    getInputInfo: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      show: false,
      pingyingMap: { ...ZH },
      tmpPingying: "", //临时中文输入
      valueArr: [], //已填入的字符串转数组
      curr: "text",
      isLower: false, //键盘显示小写(如果是英文模式就是输入小写)
      newLang: "",
      mainKeyBoardType: "",
      zhSearchList: [], //匹配到的可选中文文字列表
      zhMemoryResult: [], //历史记录中，匹配到可选的中文文字列表{key:"nih",order:1,zh:"你好"}
      ...boardMaps,
      zhKeys, //可匹配到的中文拼音
      selectedTextArr: [], //中文已选，待填入的字
      matchedKeyArr: [], //匹配到的key集合
      matchedKeyArrSelectedIndex: 0, //已匹配拼音key对应的索引
      showZhMatchArr: [], //展示的选中后的中文和未选中的拼音
      operationActiveIndex: 0, //切换列表高亮索引
      operationList: [
        {
          classs: "icon iconfont icon-keyboard-26",
          id: 1,
        },
        {
          classs: "icon iconfont icon-smile",
          id: 2,
        },
        {
          classs: "icon iconfont icon-operation",
          id: 3,
        },
        {
          classs: "icon iconfont icon-arrow-down-filling",
          id: 4,
        },
      ],
    };
  },
  watch: {
    // value: {
    //   handler(newV, oldV) {
    //     this.valueArr = this.value.split("");
    //     if (!oldV && this.show) {
    //       this.valueArr.push('<span class="key-board-flash"></span>');
    //     }
    //   },
    //   immediate: true,
    // },
    // show(newV) {
    //   this.valueArr = this.value.split("");
    //   if (newV) {
    //     this.valueArr.push('<span class="key-board-flash"></span>');
    //   } else {
    //     this.valueArr = this.valueArr.filter(
    //       (item) => item != '<span class="key-board-flash"></span>'
    //     );
    //   }
    // },
    getInputInfo: {
      handler(newV) {
        if (newV.type === "number") {
          this.changeNumberFn();
        } else if (newV.type === "cn") {
          this.curr = "text";
          this.newLang = "zh";
        } else {
          this.curr = "text";
          this.newLang = "en";
        }
      },
      immediate: true,
    },
    //监听键盘输入，拆解拼音
    tmpPingying() {
      let matchStr = this.pingyingMap[this.tmpPingying];
      //如果直接匹配，就不再做待选文章列表处理
      if (matchStr) {
        this.showZhMatchArr = [];
        this.zhSearchList = matchStr.split("");
      } else {
        //如果没有匹配，就需要做分词处理
        // let memoryResult = matchHotPingying(this.tmpPingying);
        this.getHotzhSearchList(); //根据历史输入，获取可能待选的中文列表
        let matchResult = getPingMatchObjKey(this.tmpPingying, this.zhKeys);
        // console.log("matchResult", matchResult, this.tmpPingying);

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
        //增量修改处理===========================
        if (this.showZhMatchArr.length == 0) {
          this.showZhMatchArr = this.matchedKeyArr.map((item) => {
            let t = { ...item };
            t.text = t.key;
            return t;
          });
        } else {
          this.matchedKeyArr.forEach((item, index) => {
            let showItem = this.showZhMatchArr[index];
            let newItem = {
              ...item,
              text: item.key,
            };
            //如果不存在，就追加
            if (!showItem) {
              this.showZhMatchArr[index] = newItem;
            } else {
              //如果已存在，但是拼音不一样，需要从新赋值
              // console.log("showItem.key", showItem.key, "item.key", item.key);
              if (showItem.key !== item.key || showItem.text != showItem.text) {
                this.showZhMatchArr[index] = newItem;
              }
            }
          });
          this.showZhMatchArr = [...this.showZhMatchArr];
        }
      }
      //获取已选择的中文占未已输入拼音分词的长度(下一个可更新的待选择元素的索引）
      let showZhMatchedArrLen = this.showZhMatchArr.filter(
        (item) => item.text != item.key
      ).length;
      this.matchedKeyArrSelectedIndex =
        showZhMatchedArrLen == 0 ? 0 : showZhMatchedArrLen - 1;
    },
  },
  computed: {
    showzhMemoryResult() {
      let zhMatchItem = this.showZhMatchArr[0];
      let pingyinglen = this.tmpPingying.length;
      //用户没有做选择前
      //用户输入的拼音和历史记忆匹配的key完全相等时候
      //才显示推荐的历史输入
      //  let key = this.zhMemoryResult[0] ? this.zhMemoryResult[0].key : "";
      //  console.log("xxx", this.zhMemoryResult, "pingyinglen", pingyinglen);
      if (
        zhMatchItem &&
        zhMatchItem.text === zhMatchItem.key &&
        this.zhMemoryResult[0] &&
        pingyinglen == this.zhMemoryResult[0].key.length
      ) {
        return true;
      }

      return false;
    },
    isFouse() {
      return this.show;
    },
    //已输出的结果展示值（输入框里面的字符串）
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
    // console.log("zhKeys", this.zhKeys);
    // this.$root.$on(EventKeys["vue-keyboard-cn-focus"], (data) => {
    //   console.log("data", data);
    //   let { isFocus, value } = data;
    //   this.show = isFocus;
    //   this.valueArr = value; //直接引用
    // });
  },
  methods: {
    canSwitchOther(e) {
      if (
        e.operate == "back" &&
        this.getInputInfo &&
        this.getInputInfo.type === "number" &&
        !this.getInputInfo.canSwitchOtherBoard
      ) {
        return false;
      }
      return true;
    },
    //从历史输入中匹配当前拼音
    getHotzhSearchList() {
      let memoryResult = matchHotPingying(this.tmpPingying);
      this.zhMemoryResult = memoryResult;
    },
    zhSelectedAreaItem(item) {
      return item.text;
    },
    // operateBtnFn(index) {
    //   switch (index) {
    //     case 0:
    //       break;
    //     case 1:
    //       break;
    //     case 2:
    //       break;
    //     case 3:
    //       this.show = false;
    //       this.$root.$emit(EventKeys["vue-keyboard-cn-show"], false);
    //       break;
    //   }
    // },
    fouseFn() {
      this.show = true;
    },
    /**
     * 键盘展示字符串
     */
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
    /**
     * 更新，待选中文列表
     */
    updateWillSelectedZhList() {
      if (this.showZhMatchArr[this.matchedKeyArrSelectedIndex]) {
        let matchStr = this.pingyingMap[
          this.showZhMatchArr[this.matchedKeyArrSelectedIndex].key
        ];
        if (matchStr) {
          this.zhSearchList = matchStr.split("");
        }
      }
    },
    /**
     * 点击中文待选列表文字
     */
    clickCnTextItem(text) {
      console.log("hellow", text);
      if (this.matchedKeyArr.length == 0) {
        this.appendStringItem(text);
      } else if (
        this.matchedKeyArrSelectedIndex >=
        this.matchedKeyArr.length - 1
      ) {
        this.showZhMatchArr[this.matchedKeyArrSelectedIndex].text = text;
        let textStr = "";
        for (let i = 0; i < this.showZhMatchArr.length; i++) {
          textStr += this.showZhMatchArr[i].text;
        }
        setPingying(this.tmpPingying, textStr); //存到热词里面去
        this.appendStringItem(textStr);
        this.matchedKeyArrSelectedIndex = 0;
      } else {
        this.showZhMatchArr[this.matchedKeyArrSelectedIndex].text = text;
        this.showZhMatchArr = [...this.showZhMatchArr];

        console.log(" this.showZhMatchArr", this.showZhMatchArr);
      }

      this.matchedKeyArrSelectedIndex++;
      this.updateWillSelectedZhList();
    },
    /**
     * 历史记录匹配到的词
     */
    clickCnTextItemObj(item) {
      setPingying(this.tmpPingying, item.zh); //存到热词的优先级
      this.appendStringItem(item.zh);
      this.matchedKeyArrSelectedIndex = 0;
    },
    appendStringItem(text) {
      this.tmpPingying = "";
      this.$root.$emit(EventKeys["vue-keyboard-cn-append-item"], text);
    },
    /***
     * 按键按下
     */
    press(val) {
      if (!this.canSwitchOther(val)) {
        return;
      }
      //中文输入特殊处理
      if (val.isText && this.newLang == "zh") {
        this.tmpPingying += val.text.toLowerCase();
        return;
      }
      //功能键处理
      if (val.operate && typeof this[val.operate + "Fn"] === "function") {
        this[val.operate + "Fn"](val);
        return;
      }
      //常规处理
      let text = this.getItemText(val);
      this.appendStringItem(text);
    },
    deleteFn() {
      if (this.tmpPingying.length) {
        let len = this.tmpPingying.length - 1;
        this.tmpPingying = this.tmpPingying.slice(0, len);
      } else {
        // let len = this.valueArr.length - 2;
        // this.valueArr.splice(len, 2, '<span class="key-board-flash"></span>');
        this.$root.$emit(EventKeys["vue-keyboard-cn-append-delete"]);
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
        //已匹配待选的中文元素是字符串
        if (this.zhSearchList && this.zhSearchList[0]) {
          this.clickCnTextItem(this.zhSearchList[0]);
        }
      }
      return;
    },
    //
  },
};
</script>
<style lang="scss" >
@font-face {
  font-family: "iconfont"; /* Project id 2524527 */
  src: url("./assets/font/iconfont.woff2?t=1619945697477") format("woff2"),
    url("./assets/font/iconfont.woff?t=1619945697477") format("woff"),
    url("./assets/font/iconfont.ttf?t=1619945697477") format("truetype");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-delete:before {
  content: "\e66a";
}

.icon-keyboard-26:before {
  content: "\e675";
}

.icon-operation:before {
  content: "\e679";
}

.icon-smile:before {
  content: "\e67e";
}

.icon-setting:before {
  content: "\e67d";
}

.icon-arrow-up-filling:before {
  content: "\e688";
}

.icon-arrow-down-filling:before {
  content: "\e689";
}

.icon-arrow-left-filling:before {
  content: "\e68a";
}

.icon-arrow-right-filling:before {
  content: "\e68b";
}

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
.key-board-box-wrap {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.key-board-box {
  // width: 100%;
  // position: fixed;
  // left: 0;
  // bottom: 0;
  // background: #eee;
  // padding: 5px 0;
  // user-select: none;
  // box-sizing: border-box;
  .key-board-box-head {
    height: 50px;
    background: #eee;
    position: absolute;
    width: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: 20;
  }
  .key-board-box-body {
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .key-board-box-item-wrap {
    display: flex;
    flex: 1;
    & + .key-board-box-item-wrap {
      margin-top: 5px;
    }
  }
  .key-board-box-item {
    background: rgba(255, 255, 255, 0.6);
    opacity: 0.8;
    font-size: 14px;
    padding: 5px 0;
    position: relative;
    flex: 1;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-content: center;
    transition: 0.5s;
    color: #000;
    &.key-board-box-item-disabled {
      color: #999;
    }
    span {
      line-height: 1.4;
      font-size: 14px;
      white-space: nowrap;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
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
  .pingying-box {
    font-size: 14px;
    padding: 0 5px;
    line-height: 1.6;
  }
  .head-op-icon {
    height: 40px;
    font-size: 14px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
      color: orange;
    }
  }
  &.zh-text-list-box {
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    .scroll-box-wrap {
      width: 100%;

      overflow: auto;
    }
    .scroll-box {
      display: flex;
      padding: 0 5px;
    }
    .zh-text-item {
      padding-right: 10px;
      white-space: nowrap;
      font-size: 13px;
      line-height: 1.6;
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