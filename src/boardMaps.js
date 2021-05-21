
const textMap=(lan="cn")=>{
  //&nbsp;
  let t=[
    [
      {
        text: "Q",
        isText: true
      },
      {
        text: "W",
        isText: true
      },
      {
        text: "E",
        isText: true
      },
      {
        text: "R",
        isText: true
      },
      {
        text: "T",
        isText: true
      },
      {
        text: "Y",
        isText: true
      },
      {
        text: "U",
        isText: true
      },
      {
        text: "I",
        isText: true
      },
      {
        text: "O",
        isText: true
      },
      {
        text: "P",
        isText: true
      }
    ],
    [
      {
        text: "A",
        isText: true
      },
      {
        text: "S",
        isText: true
      },
      {
        text: "D",
        isText: true
      },
      {
        text: "F",
        isText: true
      },
      {
        text: "G",
        isText: true
      },
      {
        text: "H",
        isText: true
      },
      {
        text: "J",
        isText: true
      },
      {
        text: "K",
        isText: true
      },
      {
        text: "L",
        isText: true
      }
    ],
    [
      {
        hideText:true,
        isBigBtn:true,
        classString:"icon iconfont icon-editor-to-lowercase",
        activeClassString:"icon iconfont icon-editor-to-capitalize",
        text: "大写",
        operate: "changeCapital",
      },
      {
        text: "Z",
        isText: true
      },
      {
        text: "X",
        isText: true
      },
      {
        text: "C",
        isText: true
      },
      {
        text: "V",
        isText: true
      },
      {
        text: "B",
        isText: true
      },
      {
        text: "N",
        isText: true
      },
      {
        text: "M",
        isText: true
      },
      {
        text: "删除",
        isBigBtn:true,
        classString:"icon iconfont icon-delete",
        hideText:true,
        operate: "delete"
      }
    ],
    [
      {
        text: "!?#",
        operate: "symbol"
      },
      {
        text: "123",
        operate: "changeNumber"
      },
      {
        text: function(){
          return lan=='cn'?'，':','
        },
      },
      {
        text: "&nbsp;",//解析html时候会有问题
        classString:"icon iconfont icon-Spacebar",
        hideText:true
      },
      {
        text: function(){
          return lan=='cn'?'。':'.'
        },
      },
      {
        operate: "changeLan",
        classString:"icon iconfont icon-theearth2diqiu",
      },
      {
        text:"\r\n",
        hideText:true,
        classString:"icon iconfont icon-enter"
      }
    ]
  ]
  return t;
}
export default {
  cnMap: textMap("cn"),
  enMap:textMap("en"),
  cnSymbolMap: [
    [
      {
        text: "【"
      },
      {
        text: "】"
      },
      {
        text: "{"
      },
      {
        text: "}"
      },
      {
        text: "#"
      },
      {
        text: "%"
      },
      {
        text: "^"
      },
      {
        text: "*"
      },
      {
        text: "+"
      },
      {
        text: "="
      }
    ],
    [
      {
        text: "："
      },
      {
        text: "-"
      },
      {
        text: "\\"
      },
      {
        text: "|"
      },
      {
        text: "~"
      },
      {
        text: "@"
      },
      {
        text: "《"
      },
      {
        text: "》"
      },
      {
        text: "￥"
      },
      {
        text: "&"
      },
      
    ],
    [
      {
        text: "（",
      },
      {
        text: "）",
      },
      {
        text: "^_^"
      },
      {
        text: "?"
      },
      {
        text: "!"
      },
      {
        text: "“"
      },
      {
        text: "”"
      },
      {
        text: "delete",
        classString:"icon iconfont icon-delete",
        hideText:true,
        isBigBtn:true,
        operate: "delete"
      }
    ],
    [
      {
        text: "返回",
        hideText:true,
        classString:"icon iconfont icon-back",
        operate: "back"
      },
      {
        text: "，"
      },
      {
        text: "。"
      },
      {
        text: "搜索",
        operate: "search",
        hideText:true,
        classString:"icon iconfont icon-enter",

      }
    ]
  ],
  enSymbolMap: [
    [
      {
        text: "["
      },
      {
        text: "]"
      },
      {
        text: "{"
      },
      {
        text: "}"
      },
      {
        text: "#"
      },
      {
        text: "%"
      },
      {
        text: "^"
      },
      {
        text: "*"
      },
      {
        text: "+"
      },
      {
        text: "="
      }
    ],
    [
      {
        text: "_"
      },
      {
        text: "-"
      },
      {
        text: "\\"
      },
      {
        text: "|"
      },
      {
        text: "~"
      },
      {
        text: "@"
      },
      {
        text: "<"
      },
      {
        text: ">"
      },
      {
        text: "$"
      },
      {
        text: "/"
      },
      {
        text: "&"
      }
    ],
    [
      {
        text: "(",
      },
      {
        text: ")",
      },
      {
        text: ":"
      },
      {
        text: "?"
      },
      {
        text: "!"
      },
      {
        text: "\""
      },
      {
        text: "\""
      },
      {
        text: "delete",
        classString:"icon iconfont icon-delete",
        hideText:true,
        isBigBtn:true,
        operate: "delete"
      }
    ],
    [
      {
        text: "返回",
        hideText:true,
        classString:"icon iconfont icon-back",
        operate: "back"
      },
     
      {
        text: ","
      },
      {
        text: "."
      },
      {
        text: "搜索",
        operate: "search",
        hideText:true,
        classString:"icon iconfont icon-enter",
      }
    ]
  ],
  numberMap: [
    [
      {
        text: "%"
      },
      {
        text: 1
      },
      {
        text: 2
      },
      {
        text: 3
      },
      {
        text: "delete",
        classString:"icon iconfont icon-delete",
        hideText:true,
        operate: "delete"
      }
    ],
    [
      {
        text: "+"
      },
      {
        text: "4"
      },
      {
        text: 5
      },
      {
        text: 6
      },
      {
        text: "."
      }
    ],
    [
      {
        text: "-"
      },
      {
        text: 7
      },
      {
        text: 8
      },
      {
        text: 9
      },
      {
        text: "="
      }
    ],
    [
      {
        text: "/"
      },
      {
        text: "返回",
        hideText:true,
        classString:"icon iconfont icon-back",
        operate: "back"
      },
      {
        text: "0"
      },
      {
        text: "&nbsp;",//解析html时候会有问题
        classString:"icon iconfont icon-Spacebar",
        hideText:true
      },
      {
        text: "搜索",
        hideText:true,
        classString:"icon iconfont icon-enter",
      }
    ]
  ],
};
