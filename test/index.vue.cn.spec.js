import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Index from '../src/dev/index.vue'
import EventKeys from "../src/dev/eventKeys.js"

describe('index.vue 中文输入法测试', () => {
  let wrapper=mount(Index);
  let data={
      allowEnter: false,
      canSwitchOtherBoard: true,
      inputId: "input-id-1622704419302-dca9ef3c-5223-a721-8193-be5f99543b22",
      // inputLang: "cn",//默认就是cn输入法
      isFocus: true,
      tmpValueNoFlash: "1 3",
      type: "cn",
    }
    wrapper.vm.$root.$emit(EventKeys["vue-keyboard-cn-focus"],data)
  
   //测试中文点击Q键后，删除
  it('clicked btn Q', async () => {
    await wrapper.vm.$nextTick()
    let btn= wrapper.find(".key-board-btn-Q")
    let deleteBtn=wrapper.find(".key-board-btn-delete");
    await btn.trigger("click");
    let cnDomHtml=wrapper.find(".zh-text-list-box .zh-text-item")
    expect(cnDomHtml.text()).to.equal("去");
    await deleteBtn.trigger("click");
    expect(wrapper.find(".zh-text-list-box").exists()).be.equal(false);

  })

  //测试中文点击W键后，切换输入法
    it('clicked btn W', async () => {
      await wrapper.vm.$nextTick()
      let btn= wrapper.find(".key-board-btn-W")
      let deleteBtn=wrapper.find(".key-board-btn-delete");
      await btn.trigger("click");
      let cnDomHtml=wrapper.find(".zh-text-list-box .zh-text-item")
      expect(cnDomHtml.text()).to.equal("我");
      await deleteBtn.trigger("click");
      expect(wrapper.find(".zh-text-list-box").exists()).be.equal(false);
  
    })

})
