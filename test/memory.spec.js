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