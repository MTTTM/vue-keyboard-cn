import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Index from '../src/dev/index.vue'
import EventKeys from "../src/dev/eventKeys.js"

describe('index.vue', () => {
  const wrapper = mount(Index);
  let data={
    allowEnter: false,
    canSwitchOtherBoard: false,
    inputId: "input-id-1622138235034-eeb5a538-14cd-0130-ca16-dcf78398f65c",
    isFocus: true,
    showZh: true,
    tmpValueNoFlash: "4w000000000102",
    type: "mix",
  }
  wrapper.vm.$root.$emit(EventKeys["vue-keyboard-cn-focus"],data)
   //判断整体是否展示
  it('index.vue trigger show', async () => {
    let board= wrapper.find(".key-board-box")
    await wrapper.vm.$refs["dynamicComponent"].$nextTick()
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
