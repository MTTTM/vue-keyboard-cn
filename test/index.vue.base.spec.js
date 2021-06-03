import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Index from '../src/dev/index.vue'
import EventKeys from "../src/dev/eventKeys.js"

describe('index.vue', () => {
  let wrapper;
  let data={}
  before(async () =>{
     wrapper = mount(Index);
     data={
      allowEnter: false,
      canSwitchOtherBoard: true,
      inputId: "input-id-1622704419302-dca9ef3c-5223-a721-8193-be5f99543b22",
      // inputLang: "cn",//默认就是cn输入法
      isFocus: true,
      tmpValueNoFlash: "1 3",
      type: "mix",
    }
    wrapper.vm.$root.$emit(EventKeys["vue-keyboard-cn-focus"],data)
  });
   //判断整体是否展示
  it('index.vue trigger show', async () => {
    let board= wrapper.find(".key-board-box")
    await wrapper.vm.$nextTick()
    //await wrapper.vm.$refs["dynamicComponent"].$nextTick()
    console.log("######",wrapper.html())
    expect(board.isVisible()).to.equal(true)

  })
   //默认大写
  it('index.vue has btn changeCapital and default is capital', async () => {
    await wrapper.vm.$refs["dynamicComponent"].$nextTick()
   
    let hasDom=wrapper.find(".key-board-btn-changeCapital").exists()
    &&wrapper.find(".key-board-btn-Q").text()==="Q"
    expect(hasDom).to.equal(true);

  })
     //默认中文输入法
  it('index.vue default lang is cn', async () => {
    await wrapper.vm.$refs["dynamicComponent"].$nextTick()
    let dom=wrapper.find(".key-board-box-item-curr-text")
    let hasDom=dom.exists() &&dom.text()==="中"
    expect(hasDom).to.equal(true);

  })
 //切换到小写
  it('index.vue Switch to lower case', async () => {
    await wrapper.vm.$refs["dynamicComponent"].$nextTick()
    let dom=wrapper.find(".key-board-btn-changeCapital")
    await dom.trigger("click");
    let qDom=wrapper.find(".key-board-btn-Q .span-text");
    expect(qDom.text()).to.equal("q");
  })
   //切换到大写
  it('index.vue Switch to capital case', async () => {
    await wrapper.vm.$refs["dynamicComponent"].$nextTick()
    let dom=wrapper.find(".key-board-btn-changeCapital")
    await dom.trigger("click");
    let qDom=wrapper.find(".key-board-btn-Q .span-text");
    expect(qDom.text()).to.equal("Q");
  })
    //切换到符号键盘
  it('index.vue Switch to symbol', async () => {
    await wrapper.vm.$refs["dynamicComponent"].$nextTick()
    let dom=wrapper.find(".key-board-btn-symbol")
    await dom.trigger("click");
    let qDom=wrapper.find(".key-board-btn-【");
    expect(qDom.exists()).to.equal(true);
  })
   //切换回中文键盘
  it('index.vue Switch to cn case', async () => {
    await wrapper.vm.$refs["dynamicComponent"].$nextTick()
    let dom=wrapper.find(".key-board-btn-back")
    await dom.trigger("click");
    let qDom=wrapper.find(".key-board-btn-symbol");
    expect(qDom.exists()).to.equal(true);
  })
   //切换到数字键盘
  it('index.vue Switch to number case', async () => {
    await wrapper.vm.$refs["dynamicComponent"].$nextTick()
    let dom=wrapper.find(".key-board-btn-changeNumber")
    await dom.trigger("click");
    let qDom=wrapper.find(".key-board-btn-1");
    expect(qDom.exists()).to.equal(true);
  })
//切换回到中文键盘
  it('index.vue Switch to cn case from number case', async () => {
    await wrapper.vm.$refs["dynamicComponent"].$nextTick()
    let dom=wrapper.find(".key-board-btn-back")
    await dom.trigger("click");
    let qDom=wrapper.find(".key-board-btn-symbol");
    expect(qDom.exists()).to.equal(true);
  })
})
