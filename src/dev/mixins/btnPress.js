/**
 * 给board.vue
 * 和operation.vue
 * 使用的
 */
import EventKeys from "../eventKeys";
export default{
  props: {
    getInputInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
  /**
   * 不允许输入回车键
   * && 不存在待选的中文
   * 时候按回车键触发 input的submit事件
   */
    enterBtnCallback(item){
      let result={handle:false};
      let isEnter=item.text === "\r\n";
        if (
          this.getInputInfo &&
          this.getInputInfo.allowEnter == false &&
          !this.showZhText &&
          isEnter
        ) {
          this.$root.$emit(EventKeys["vue-keyboard-cn-submit"], "");
          this.$emit("show", false);
          result={handle:true};
        }
        else if(isEnter && this.showZhText){
            //如果存在待选的中文，换行按钮就是确认按钮
          //把展示区域的拼音或”中文和拼音混合“字符串发送给input
            let t = "";
            this.showZhMatchArr.forEach((e) => {
              t += e.text;
            });
            this.appendStringItem(t);
            result={handle:true};
        }
        else if(isEnter){
          this.appendStringItem(item.text);
          result={handle:true};
        }
        console.log("result",result)
        return result;
    },
    appendStringItem(text) {
      if(this.tmpPingying){
        this.tmpPingying = "";
      }
      this.$root.$emit(EventKeys["vue-keyboard-cn-append-item"], text);
    },
  },
}