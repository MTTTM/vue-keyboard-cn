import { expect } from 'chai'
import {saveCopyList,getCopyLocalStorage,addOne,nativeCopyString} from "../src/dev/copyPaste"

// describe('nativeCopyString', () => {
//   it('nativeCopyString("abc") should be true',  () => {
//     let t=nativeCopyString("abc")
//     expect(t).to.equal(true);
//   })

// });

describe('saveCopyList&&getCopyLocalStorage', () => {
  it('getCopyLocalStorage() should be ["a","b"]',  () => {
    localStorage.clear();
    saveCopyList(["a","b"]);
    expect(getCopyLocalStorage()).to.deep.equal(["a","b"]);
  })

});

describe('addOne', () => {
  it('addOne should be ["abc"]',  () => {
    localStorage.clear();
    let t=addOne("abc");
    expect(t).to.deep.equal(["abc"]);
  })

  it('addOne called mulit more than 20 should be array with item 20',  () => {
    localStorage.clear();
    localStorage.clear();
    for(let i=0;i<20;i++){
       addOne(i)
    }
    let t=addOne("最新的")
    let result=["最新的",19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1];
    expect(t).to.deep.equal(result);
  })

});

describe('saveCopyList', () => {
  it('saveCopyList() should be ["a","b"]',  () => {
    localStorage.clear();
    saveCopyList(["a","b"]);
    let t=JSON.parse(localStorage.getItem("vue-keyboard-copy"))
    expect(t).to.deep.equal(["a","b"]);
  })

});

