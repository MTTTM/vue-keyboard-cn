import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Index from '../src/dev/index.vue'
import EventKeys from "../src/dev/eventKeys.js"
import { person, hearts, symbo } from "../src/dev/emojiImages.js";
let emoji={
  person,
  hearts,
  symbo,
}
const tabTestFn=(type="cn")=>{
  describe('index.tab.vue:'+type, async () => {
    let wrapper = mount(Index);
    await wrapper.setProps({ emojiMap: emoji})
    let  data={
      allowEnter: false,
      canSwitchOtherBoard: true,
      inputId: "input-id-1622704419302-dca9ef3c-5223-a721-8193-be5f99543b22",
      // inputLang: "cn",//默认就是cn输入法
      isFocus: true,
      tmpValueNoFlash: "1 3",
      type: type,
    }
    wrapper.vm.$root.$emit(EventKeys["vue-keyboard-cn-focus"],data)
   //第一个选项高亮
  it('first tab has className active', async () => {
    await wrapper.vm.$nextTick()
    let board= wrapper.findAll('.key-board-box-head-op .head-op-icon').at(0)
    expect(board.classes()).to.be.an('array').that.include("active");
  })

    //表情选项是否可以点击
    if(type=="mix"){
      it('emoji tab can click', async () => {
        await wrapper.vm.$nextTick()
        let board= wrapper.findAll('.key-board-box-head-op .head-op-icon').at(1)
        
        await board.trigger("click");
        expect(board.classes()).to.be.an('array').that.include("active");
        //emoji面板是否存在
        let isExists=wrapper.find(".emoji-wrap").exists()
        expect(isExists).to.equal(true);
    })
    }
    else{
      it('emoji tab cant click', async () => {
        await wrapper.vm.$nextTick()
        let board= wrapper.findAll('.key-board-box-head-op .head-op-icon').at(1)
        
        await board.trigger("click");
        expect(board.classes()).to.be.an('array').that.does.not.include("active");
        //emoji面板是否存在
        let isExists=wrapper.find(".emoji-wrap").exists()
        expect(isExists).to.equal(false);
    })
    }
  

  //操作面板tab是否可以点击
  it('operating tab can click', async () => {
    await wrapper.vm.$nextTick()
    let board= wrapper.findAll('.key-board-box-head-op .head-op-icon').at(2)
    await board.trigger("click");
    expect(board.classes()).to.be.an('array').that.include("active");
    //操作面板是否存在
    // let isExists=wrapper.find(".operation-wrap-left-pancel").exists()
    // expect(isExists).to.equal(false);
  })


 })
}



tabTestFn("cn")
tabTestFn("en")
tabTestFn("int")
tabTestFn("float")
tabTestFn("mix")