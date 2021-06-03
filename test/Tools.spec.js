import { expect } from 'chai'
// import 'core-js';
import {
  getIndexInArray,
  getPingMatchObjKey,
  wrapStringSingleItem,
  splitStringToArray,
  getElementIndexOnParent,
  labelStringRemoveLabelExceptImg,
  uuid
} from "../src/dev/tools"
import {zhKeysArray} from "../src/dev/zh"

describe('getIndexInArray', () => {
  it('getIndexInArray should be [{index:"1",text:"b"}]',  () => {
    let t=getIndexInArray("abcdef",'b');
    expect(t).to.be.an('array').
    that.to.have.lengthOf(1).
    that.to.deep.equal([{index:1,text:"b"}]);
  })

})

describe('getPingMatchObjKey', () => {
  it('getPingMatchObjKey should be array',  () => {
    let t=getPingMatchObjKey("nihaoma",zhKeysArray);
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
describe('getFullPingMatchObjKey', () => {
  it('getFullPingMatchObjKey should be array',  () => {
    let t=getPingMatchObjKey("nihao",["__$lastClearTime","nihao"]);
    expect(t).to.be.an('array').
    that.to.have.lengthOf(1).
    that.to.deep.equal(
      [
        {
         index: 0,
         key: "nihao"
        }
       ]
    );
  })

  it('getFullPingMatchObjKey should be empaty array',  () => {
    let t=getPingMatchObjKey("nihao", ["__$lastClearTime"]);
    expect(t).to.be.an('array').
    that.to.have.lengthOf(0).
    that.to.deep.equal([]);
  })

})

describe('wrapStringSingleItem', () => {
  it('wrapStringSingleItem should be html label string',  () => {
    let t=wrapStringSingleItem("你");
    expect(t).to.equal(`<span class="vue-keyboard-text-item"  tabindex="0">你</span>`);
  });
})

describe('splitStringToArray', () => {
  it('splitStringToArray should be array with 1 element',  () => {
    let t=splitStringToArray("1");
    expect(t).to.be.an('array').
    that.to.have.lengthOf(1).
    that.to.deep.equal([`<span class="vue-keyboard-text-item"  tabindex="0">1</span>`]);
  });

  it('splitStringToArray should be array with 3 element',  () => {
    let param=`4<img attr-img=""vue-keyboard-cn-emoji" class=" emoji-icon icon-wink" src="https://raw.githubusercontent.com/MTTTM/vue-keyboard-cn/main/src/dev/assets/images//person/6_wink.png" />1`;
    let t=splitStringToArray(param);
    expect(t).to.be.an('array').
    that.to.have.lengthOf(3).
    that.to.deep.equal([
      '<span class="vue-keyboard-text-item"  tabindex="0">4</span>',
      '<img attr-img=""vue-keyboard-cn-emoji" class=" emoji-icon icon-wink" src="https://raw.githubusercontent.com/MTTTM/vue-keyboard-cn/main/src/dev/assets/images//person/6_wink.png" />',
      '<span class="vue-keyboard-text-item"  tabindex="0">1</span>'
    ]);
  });

  it('splitStringToArray  should be array with 2 element when it allow enter keyboard',  () => {
    let t=splitStringToArray(`0\r\n2`,true);
    expect(t).to.be.an('array').
    that.to.have.lengthOf(3).
    that.to.deep.equal(
      [
          '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
          '<br/>',
         '<span class="vue-keyboard-text-item"  tabindex="0">2</span>'
      ]
  );
  });
  it('splitStringToArray  should be array with 2 element when it no allow enter keyboard',  () => {
    let t=splitStringToArray(`0\r\n2`,false);
    console.log("ttttttttttt",t)
    expect(t).to.be.an('array').
    that.to.have.lengthOf(3).
    that.to.deep.equal(
      [
          '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0"> </span>',
         '<span class="vue-keyboard-text-item"  tabindex="0">2</span>'
      ]
  );
  });

})

describe('getElementIndexOnParent', () => {
  it('getFullPingMatchObjKey should be array',  () => {
    let wrap=document.createElement("div");
    let createChild=function(elementName="p"){
      let t=document.createElement("div");
      wrap.appendChild(t);
      return t;
    }
    createChild("p");
    createChild("p");
    createChild("p");
    let div=createChild("div");
    document.body.appendChild(wrap)
    expect(getElementIndexOnParent(div)).to.equal(3);
  })
})

describe('labelStringRemoveLabelExceptImg', () => {
  it('labelStringRemoveLabelExceptImg should be 0',  () => {
    let t=labelStringRemoveLabelExceptImg(`<span class="vue-keyboard-text-item"  tabindex="0">0</span>`);
    expect(t).to.equal("0");
  })
  it('labelStringRemoveLabelExceptImg should be Html Label',  () => {
    let t=labelStringRemoveLabelExceptImg(`<img attr-img=""vue-keyboard-cn-emoji" class=" emoji-icon icon-blush" src="https://raw.githubusercontent.com/MTTTM/vue-keyboard-cn/main/src/dev/assets/images//person/4_blush.png" />`);
    expect(t).to.equal(`<img attr-img=""vue-keyboard-cn-emoji" class=" emoji-icon icon-blush" src="https://raw.githubusercontent.com/MTTTM/vue-keyboard-cn/main/src/dev/assets/images//person/4_blush.png" />`);
  })

  it('labelStringRemoveLabelExceptImg should be \r\n',  () => {
    let t=labelStringRemoveLabelExceptImg(`<br/>`);
    expect(t).to.equal(`\r\n`);
  })
})

describe('uuid', () => {
  it('uuid should be true',  () => {
    let arr=[];
    for(let i=0;i<100;i++){
      arr.push(uuid());
    }
   // console.log("uuid",arr)
   let end= new Set(arr).size === arr.length;
    expect(end).to.equal(true);
  })

})


