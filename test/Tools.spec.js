import { expect } from 'chai'
import {getIndexInArray} from "../src/dev/tools"


describe('getIndexInArray', () => {
  it('getIndexInArray should be [{index:"1",text:"b"}]',  () => {
    let t=getIndexInArray("abcdef",'b');
    console.log("tttt",t);
    expect(t).to.be.an('array').
    that.to.have.lengthOf(1).
    that.to.deep.equal([{index:1,text:"b"}]);
  })

})
