import { expect } from 'chai'
import {first,last,moveTo,moveToFn,getNoCursorArr} from "../src/dev/cursor"

describe('first', () => {
  it('first() should be object with index 0',  () => {
    let test=first(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>'
      ]
     )
    expect(test).to.deep.equal(
      {
        index:0,
        arr: [
          '<span class="key-board-flash"></span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>'
        ]
      }  
      );
  })
});


describe('last', () => {
  it('last() should be object with index 4',  () => {
    let test=last(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>'
      ]
     )
    expect(test).to.deep.equal(
      {
        index:4,
        arr: [
          
          '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="key-board-flash"></span>',
        ]
      
      }  
      );
  })
});


describe('moveTo', () => {
  it('moveTo(array,3) should be object with index 3',  () => {
    let test=moveTo(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>'
      ],
      3
     )
    expect(test).to.deep.equal(
      {
          index:3,
          arr: [
            '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
            '<span class="key-board-flash"></span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        ]
      }  
      );
  })

  it('moveTo(array,0) should be object with index 0',  () => {
    let test=moveTo(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>'
      ],
      0
     )
    expect(test).to.deep.equal(
      {
        index:0,
        arr: [
          '<span class="key-board-flash"></span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        ]
      }
      );
  })

  it('moveTo(array,4) should be object with index 4',  () => {
    let test=moveTo(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>'
      ],
      4
     )
    expect(test).to.deep.equal(
      {
        index:4,
        arr: [
          '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="key-board-flash"></span>'
        ]
      }
      );
  })
});




describe('moveToFn', () => {
  it('moveToFn(array,left) should be object with index 3',  () => {
    let test=moveToFn(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="key-board-flash"></span>'
        ],        
      "left"
     )
    expect(test).to.deep.equal(
        {
          index:3,
          arr:[
            '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
            '<span class="key-board-flash"></span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          ]
        }
    );
  })

  it('moveToFn(array,left) should be object with {}',  () => {
    let test=moveToFn(
      [
        '<span class="key-board-flash"></span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
      ],            
      "left"
     )
    expect(test).to.deep.equal({});
  })

  it('moveToFn(array,right) should be object with index 2',  () => {
    let test=moveToFn(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="key-board-flash"></span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        ],            
      "right"
     )
    expect(test).to.deep.equal(
      {
        index:2,
        arr:[
          '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
          '<span class="key-board-flash"></span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        ]
      }        
    );
  })


  it('moveToFn(array,right) should be object {}',  () => {
    let test=moveToFn(
      [
          '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="key-board-flash"></span>'
        ],                
      "right"
     )
    expect(test).to.deep.equal({});
  })



  it('moveToFn(array,top) should be object with index 0',  () => {
    let test=moveToFn(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="key-board-flash"></span>'
      ],                  
      "top"
     )
    expect(test).to.deep.equal(
      {
          index:0,
          arr: [
            '<span class="key-board-flash"></span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
            '<span class="vue-keyboard-text-item"  tabindex="0">9</span>'
        ]

    });
  })


  it('moveToFn(array,bottom) should be object with index 4',  () => {
    let test=moveToFn(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="key-board-flash"></span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        
      ],         
      "bottom"
     )
    expect(test).to.deep.equal(
      {
        index:4,
        arr: [
         '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
         '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
          '<span class="key-board-flash"></span>',
       ]
    });
  })

});


describe('getNoCursorArr', () => {
  it('getNoCursorArr(array) should be array with item 4',  () => {
    let test=getNoCursorArr(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
        '<span class="key-board-flash"></span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
      ]
     )
    expect(test).to.deep.equal(
      [
        '<span class="vue-keyboard-text-item"  tabindex="0">1</span>',
        '<span class="vue-keyboard-text-item"  tabindex="0">0</span>',
       '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
       '<span class="vue-keyboard-text-item"  tabindex="0">9</span>',
     ]);
  })
})