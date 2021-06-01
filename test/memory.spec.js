import { expect } from 'chai'
import {getItem,matchHotPingying,setPingying} from "../src/dev/memory"

describe('setPingying', () => {
  it('getItem() should be object with order 0',  () => {
    localStorage.clear();
    setPingying("nihao","你好")
    expect(getItem("nihao")).to.deep.equal([{
      zh:"你好",
      order:0,
      key:"nihao"
   }]);
  })
  it('getItem() should be object with order 1',  () => {
    localStorage.clear();
    setPingying("nihao","你好")
    setPingying("nihao","你好")
    expect(getItem("nihao")).to.deep.equal([{
      zh:"你好",
      order:1,
      key:"nihao"
   }]);
  })
 
  it('getItem() should be empty object',  () => {
    localStorage.clear();
    setPingying("meilijiangongheguohahahah","美利坚共和国xx")
    expect(getItem("meilijiangongheguohahahah")).to.deep.equal({});
  })



  it(' test last updateTime more than 7 day,getItem() should be {}',  () => {
    localStorage.clear();
    setPingying("nihao","你好")
    try{
      let t= localStorage.getItem("vue-keyboard-cn-store");
      let parseJons=JSON.parse(t);
      parseJons["__$lastClearTime"]=new Date().getTime()-(86400*7+200);
      let stringStore=JSON.stringify(parseJons);
      localStorage.setItem("vue-keyboard-cn-store",stringStore);
      setPingying("haha","哈哈")
    }catch(e){
      console.log("报错了",e)
    }
    expect(getItem("nihao")).to.deep.equal({});
  })
  it(' test last updateTime more than 7 day,getItem("haha") should be valid object',  () => {
    localStorage.clear();
    setPingying("nihao","你好")
    try{
      let t= localStorage.getItem("vue-keyboard-cn-store");
      let parseJons=JSON.parse(t);
      parseJons["__$lastClearTime"]=new Date().getTime()-(86400*7+200);
      let stringStore=JSON.stringify(parseJons);
      localStorage.setItem("vue-keyboard-cn-store",stringStore);
      setPingying("haha","哈哈")
    }catch(e){
      console.log("报错了",e)
    }
    expect(getItem("haha")).to.deep.equal([{
          zh:"哈哈",
          order:0,
          key:"haha"
       }]);
  })
 
});
describe('matchHotPingying', () => {
  it('matchHotPingying call muli time,getItem() should be array with three element',  () => {
    localStorage.clear();
    setPingying("nihao","你好")
    setPingying("nihao","你好")
    setPingying("nihao","拟好")
    setPingying("nihao","拟好")
    setPingying("nihao","拟好")
    setPingying("nihao","你号")
    setPingying("nihao","你号")
    setPingying("nihao","你号")
    setPingying("nihao","你号")
    setPingying("nihao","(*´▽｀)ノノ")
    expect(matchHotPingying("nihao")).to.deep.equal( [
      {
       zh:"你号",
       order:3,
       key:"nihao"
    },
      {
       zh:"拟好",
       order:2,
       key:"nihao"
    },
    {
       zh:"你好",
       order:1,
       key:"nihao"
    },
  ]);
  })



 
});