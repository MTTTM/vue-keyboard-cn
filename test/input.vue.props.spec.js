import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import InputConpoment from '../src/dev/input.vue'
describe('Input props', async () => {
  

it('input innerHtml is 1', async () => {
  let wrapper = mount(InputConpoment,{
    propsData: {
      value: "1"
    }
  });
  await wrapper.vm.$nextTick()
   let span=wrapper.findAll(".vue-keyboard-text-item")
   let result=span.length==1&&span.at(0).text()==1
  expect(result).to.be.equal(true);
})

it('input innerHtml is " ",when it is not allow enter', async () => {
  let wrapper = mount(InputConpoment,{
    propsData: {
      value: "\r\n"
    }
  });
  await wrapper.vm.$nextTick()
 
  let span=wrapper.findAll(".vue-keyboard-text-item")
   let result=span.length==1&&span.at(0).text()==""
   expect(result).to.be.equal(true);
})
it('input innerHtml is "<br/>",when it is  allow enter', async () => {
  let wrapper = mount(InputConpoment,{
    propsData: {
      value: "\r\n",
      allowEnter:true
    }
  });
  await wrapper.vm.$nextTick()
  let span=wrapper.findAll(".vue-keyboard-text-item")
  let br=wrapper.findAll("br")
  let result=span.length==0&&br.length==1;
  expect(result).to.be.equal(true);
})

it('input innerHtml is "<br/>"<span>,when enter is  allow enter', async () => {
  let wrapper = mount(InputConpoment,{
    propsData: {
      value: `
1`,
      allowEnter:true
    }
  });
  await wrapper.vm.$nextTick()
  let span=wrapper.findAll(".vue-keyboard-text-item")
  let brLabel=wrapper.findAll("br");
  let result=span.length==1&&span.at(0).text()==`1`&&
  brLabel.length==1;
  expect(result).to.be.equal(true);
})



it('input innerHtml is img,when img was inputed', async () => {
  let path=`<img attr-img="" vue-keyboard-cn-emoji"="" class=" emoji-icon icon-smile" src="https://raw.githubusercontent.com/MTTTM/vue-keyboard-cn/main/src/dev/assets/images//person/1_smile.png">`
  let wrapper = mount(InputConpoment,{
    propsData: {
      value: path
    }
  });
  await wrapper.vm.$nextTick()
  let img=wrapper.findAll("img");
  let span=wrapper.findAll(".vue-keyboard-text-item")
  let result=img.length==1&&span.length==0;
  expect(result).to.be.equal(true);
})

})