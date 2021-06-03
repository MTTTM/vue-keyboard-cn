import { expect } from 'chai'
import { mount,createWrapper } from '@vue/test-utils'
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
    beforeEach(() =>{
      wrapper.vm.$root.$emit(EventKeys["vue-keyboard-cn-focus"],data)
    });
   
  
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

  //测试中文点击W键后，点击待选中文
  //测试中文点击W键后，点击回车
    it('clicked btn W', async () => {
      await wrapper.vm.$nextTick()
      let btn= wrapper.find(".key-board-btn-W")
      let enterBtn=wrapper.find(".key-board-btn-enter");
      await btn.trigger("click");
      let cnDomHtml=wrapper.find(".zh-text-list-box .zh-text-item")
      expect(cnDomHtml.text()).to.equal("我");
      //输入一个拼音后回车
      await enterBtn.trigger("click");
     const rootWrapper = createWrapper(wrapper.vm.$root);
     const rootAppendEvent=rootWrapper.emitted(EventKeys["vue-keyboard-cn-append-item"]);
     expect(rootAppendEvent).to.be.deep.include(['我'])
     
    })
      //测试中文点击W键后，切换输入法
      it('clicked btn W and switch', async () => {
        await wrapper.vm.$nextTick()
        let btn= wrapper.find(".key-board-btn-W")
        let switchBtn=wrapper.find(".key-board-btn-changeLan");
        await btn.trigger("click");
        let cnDomHtml=wrapper.find(".zh-text-list-box .zh-text-item")
        expect(cnDomHtml.text()).to.equal("我");
        await switchBtn.trigger("click");
        cnDomHtml=wrapper.find(".zh-text-list-box .zh-text-item");//一定要重新获取，因为之前赋值的可能还没有及时销毁
        expect(cnDomHtml.exists()).to.equal(false);
        await switchBtn.trigger("click");//再回复中文输入法，否则后面都会受到影响
      })

    it('clicked btn N and btn H,then click enter btn', async () => {
      await wrapper.vm.$nextTick()
      let enterBtn=wrapper.find(".key-board-btn-enter");
        //输入两个辅音单词，再回车
      let btnN= wrapper.find(".key-board-btn-N")
      let btnH= wrapper.find(".key-board-btn-H")
      await btnN.trigger("click");
      await btnH.trigger("click");
      await enterBtn.trigger("click");
      const rootWrapper = createWrapper(wrapper.vm.$root);
      const rootAppendEvent=rootWrapper.emitted(EventKeys["vue-keyboard-cn-append-item"]);
        console.log("event",rootAppendEvent)
        expect(rootAppendEvent).to.be.deep.include(['nh'])
    })

    //测试热词
    it('test hot word menory', async () => {
      await wrapper.vm.$nextTick()
      let enterBtn=wrapper.find(".key-board-btn-enter");
        //输入两个辅音单词，再回车
      let btnN= wrapper.find(".key-board-btn-N")
      let btnI= wrapper.find(".key-board-btn-I")
      let btnH= wrapper.find(".key-board-btn-H")
      let btnA= wrapper.find(".key-board-btn-A")
      let btnO= wrapper.find(".key-board-btn-O")
      //你
      await btnN.trigger("click");
      await btnI.trigger("click");
      //好
      await btnH.trigger("click");
      await btnA.trigger("click");
      await btnO.trigger("click");
      //中文待选列表
      await wrapper.find(".zh-text-list-box .zh-text-item").trigger("click");//点击”你“字
      await wrapper.find(".zh-text-list-box .zh-text-item").trigger("click");//点击”好“字

      await enterBtn.trigger("click");

      const rootWrapper = createWrapper(wrapper.vm.$root);
      const rootAppendEvent=rootWrapper.emitted(EventKeys["vue-keyboard-cn-append-item"]);
      expect(rootAppendEvent).to.be.deep.include(['你好'])

      /**
       * 在本地存在热词”你好“的缓存后再次输入nihao
       * 将会存在可选的”你好“选项
       *  */  
       //你
       await btnN.trigger("click");
       await btnI.trigger("click");
       //好
       await btnH.trigger("click");
       await btnA.trigger("click");
       await btnO.trigger("click");
       //中文待选列表
       await wrapper.find(".zh-text-list-box .zh-text-item").trigger("click");//点击”你好“字
       await enterBtn.trigger("click");
       console.log("event",rootAppendEvent)
       let matchLength=0;
       rootAppendEvent.forEach(item=>{
         if(item&&item[0]=="你好"){
          matchLength++;
         }
       })
       expect(matchLength).to.be.equal(2);

    })


    //输入拼音，选中一部分后，还有未选择中文的拼音时候回车
    it('inputed nimena,then click enter btn', async () => {
      await wrapper.vm.$nextTick()
      let enterBtn=wrapper.find(".key-board-btn-enter");
        //输入两个辅音单词，再回车
      let btnN= wrapper.find(".key-board-btn-N")
      let btnI= wrapper.find(".key-board-btn-I")
      let btnM= wrapper.find(".key-board-btn-M")
      let btnE= wrapper.find(".key-board-btn-E")
      let btnA= wrapper.find(".key-board-btn-A")
      //你
      await btnN.trigger("click");
      await btnI.trigger("click");
      //们
      await btnM.trigger("click");
      await btnE.trigger("click");
      await btnN.trigger("click");
      //a
      await btnA.trigger("click");
      //中文待选列表
      await wrapper.find(".zh-text-list-box .zh-text-item").trigger("click");//点击”你“字
      await wrapper.find(".zh-text-list-box .zh-text-item").trigger("click");//点击”们“字

      await enterBtn.trigger("click");

      const rootWrapper = createWrapper(wrapper.vm.$root);
      const rootAppendEvent=rootWrapper.emitted(EventKeys["vue-keyboard-cn-append-item"]);
      expect(rootAppendEvent).to.be.deep.include(['你们a'])

      

    })

   
})
