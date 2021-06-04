import { expect } from 'chai'
import { mount,createWrapper } from '@vue/test-utils'
import InputConpoment from '../src/dev/input.vue'
import EventKeys from "../src/dev/eventKeys.js"
describe('Input root event,int', async () => {

  it('input type int,valid value 1', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"int"
      }
    });
    await wrapper.setData({ isFocus: true })
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], 1)
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    console.log("init html",wrapper.html())
    let result=span.length==1&&span.at(0).text()==1
    expect(result).to.be.equal(true);
  })

  it('input type int,invalid value 1.1', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"int"
      }
    });
    await wrapper.setData({ isFocus: true })
    await wrapper.vm.$nextTick()
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], 1.1)
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    let result=span.length==0
    expect(result).to.be.equal(true);
  })

})

describe('Input root event,float', async () => {

  it('input type float,valid value 1.12', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"float"
      }
    });
    await wrapper.setData({ isFocus: true })
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], 1.12)
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    console.log("init html",wrapper.html())
    let result=span.length==4&&wrapper.find(".vue-keyboard-input-text").text()==1.12
    expect(result).to.be.equal(true);
  })
  //1也是可以接受输入的，因为1.12是一个个按键输入的
  it('input type float,valid value 1,should be true', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"float"
      }
    });
    await wrapper.setData({ isFocus: true })
    await wrapper.vm.$nextTick()
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], 1)
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    let result=span.length==1&&wrapper.find(".vue-keyboard-input-text").text()==1
    expect(result).to.be.equal(true);
  })

  it('input type float,invalid value 1.134,should be false', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"float"
      }
    });
    await wrapper.setData({ isFocus: true })
    await wrapper.vm.$nextTick()
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], 1.134)
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    let result=span.length==0
    expect(result).to.be.equal(true);
  })
  it('input type float,valid value 1.34 and props decimal 3,should be true', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"float",
        decimal:3
      }
    });
    await wrapper.setData({ isFocus: true })
    await wrapper.vm.$nextTick()
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], 1.34)
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    let result=span.length==4&&wrapper.find(".vue-keyboard-input-text").text()==1.34
    expect(result).to.be.equal(true);
  })

})


describe('Input root event,cn', async () => {

  it('input type cn,valid value 我', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"cn"
      }
    });
    await wrapper.setData({ isFocus: true })
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], "我")
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    console.log("init html",wrapper.html())
    let result=span.length==1&&span.at(0).text()=="我"
    expect(result).to.be.equal(true);
  })
  it('input type cn,valid value ·', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"cn"
      }
    });
    await wrapper.setData({ isFocus: true })
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], "·")
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    console.log("init html",wrapper.html())
    let result=span.length==1&&span.at(0).text()=="·"
    expect(result).to.be.equal(true);
  })

  it('input type cn,invalid value ，', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"cn"
      }
    });
    await wrapper.setData({ isFocus: true })
    await wrapper.vm.$nextTick()
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], "，")
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    let result=span.length==0
    expect(result).to.be.equal(true);
  })

})

describe('Input root event,en', async () => {

  it('input type en,valid value A', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"en"
      }
    });
    await wrapper.setData({ isFocus: true })
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], 'A')
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    console.log("init html",wrapper.html())
    let result=span.length==1&&span.at(0).text()=='A'
    expect(result).to.be.equal(true);
  })
  it('input type en,valid value A', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"en"
      }
    });
    await wrapper.setData({ isFocus: true })
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], 'a')
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    console.log("init html",wrapper.html())
    let result=span.length==1&&span.at(0).text()=='a'
    expect(result).to.be.equal(true);
  })

  it('input type en,invalid value ","', async () => {
    let wrapper = mount(InputConpoment,{
      propsData: {
        value: "",
        type:"en"
      }
    });
    await wrapper.setData({ isFocus: true })
    await wrapper.vm.$nextTick()
    const rootWrapper = createWrapper(wrapper.vm.$root);
    rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], ",")
    await wrapper.vm.$nextTick()
    let span=wrapper.findAll(".vue-keyboard-text-item")
    let result=span.length==0
    expect(result).to.be.equal(true);
  })

})

describe('Input root event,Input rex test', async () => {

    it('input type int,rex', async () => {
      let wrapper = mount(InputConpoment,{
        propsData: {
          value: "",
          type:"int",
          regx:/^[\d%+-/]+$/gi
        }
      });
      await wrapper.setData({ isFocus: true })
      await wrapper.vm.$nextTick()
      const rootWrapper = createWrapper(wrapper.vm.$root);
      rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], "%")
      await wrapper.vm.$nextTick()
      let span=wrapper.findAll(".vue-keyboard-text-item")
      let result=span.length==1&&span.at(0).text()=="%";
      expect(result).to.be.equal(true);
    })

    it('input type cn,rex', async () => {
      let wrapper = mount(InputConpoment,{
        propsData: {
          value: "",
          type:"cn",
          regx:/^[\d%+-/]+$/gi
        }
      });
      await wrapper.setData({ isFocus: true })
      await wrapper.vm.$nextTick()
      const rootWrapper = createWrapper(wrapper.vm.$root);
      rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], "%")
      await wrapper.vm.$nextTick()
      let span=wrapper.findAll(".vue-keyboard-text-item")
      let result=span.length==1&&span.at(0).text()=="%";
      expect(result).to.be.equal(true);
    })

    it('input type en,rex', async () => {
      let wrapper = mount(InputConpoment,{
        propsData: {
          value: "",
          type:"en",
          regx:/^[\d%+-/]+$/gi
        }
      });
      await wrapper.setData({ isFocus: true })
      await wrapper.vm.$nextTick()
      const rootWrapper = createWrapper(wrapper.vm.$root);
      rootWrapper.vm.$emit(EventKeys["vue-keyboard-cn-append-item"], "%")
      await wrapper.vm.$nextTick()
      let span=wrapper.findAll(".vue-keyboard-text-item")
      let result=span.length==1&&span.at(0).text()=="%";
      expect(result).to.be.equal(true);
    })

})