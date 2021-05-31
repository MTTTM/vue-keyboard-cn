import { expect } from 'chai'
import 'core-js';
import {getIndexInArray,getPingMatchObjKey} from "../src/dev/tools"
import {zhKeysArray} from "../src/dev/zh"

describe('getIndexInArray', () => {
  it('getIndexInArray should be [{index:"1",text:"b"}]',  () => {
    let t=getIndexInArray("abcdef",'b');
    console.log("tttt",t);
    expect(t).to.be.an('array').
    that.to.have.lengthOf(1).
    that.to.deep.equal([{index:1,text:"b"}]);
  })

})

describe('getPingMatchObjKey', () => {
  it('getPingMatchObjKey should be array',  () => {
    let t=getPingMatchObjKey("nihaoma",zhKeysArray);
    console.log("tttt",t);
    expect(t).to.be.an('array').
    that.to.have.lengthOf(3).
    that.to.deep.equal([
      {
        index: 0,
        key: "ni"
      },
      {
        index: 2,
        key: "hao"
      },
      {
       index: 5,
       key: "ma"
      },
     ]);
  })

})

