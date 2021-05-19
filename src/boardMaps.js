
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
        text: "大写",
        zhText: "大写",
        enText: "capital",
        zhLowText: "小写",
        enLowText: "low",
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
        zhText: "删除",
        enText: "delete",
        operate: "delete"
      }
    ],
    [
      {
        text: "符",
        zhText: "符",
        enText: "symbol",
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
        operate: "search",
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
        text: "《"
      },
      {
        text: "》"
      },
      {
        text: "￥"
      },
      {
        text: "$"
      },
      {
        text: "&"
      },
      {
        text: "."
      }
    ],
    [
      {
        text: "123",
        operate: "changeNumber"
      },
      {
        text: "..."
      },
      {
        text: ","
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
        zhText: "删除",
        enText: "delete",
        operate: "delete"
      }
    ],
    [
      {
        text: "返回",
        zhText: "返回",
        enText: "back",
        operate: "back"
      },
      {
        text: " "
      },
      {
        text: "搜索",
        operate: "search",
        zhText: "搜索",
        enText: "search",
        zhConfirmText: "确认",
        enConfirmText: "Confirm"
      }
    ]
  ],
  enSymbolMap: [
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
        text: "《"
      },
      {
        text: "》"
      },
      {
        text: "￥"
      },
      {
        text: "$"
      },
      {
        text: "&"
      },
      {
        text: "."
      }
    ],
    [
      {
        text: "123",
        operate: "changeNumber"
      },
      {
        text: "..."
      },
      {
        text: ","
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
        zhText: "删除",
        enText: "delete",
        operate: "delete"
      }
    ],
    [
      {
        text: "返回",
        zhText: "返回",
        enText: "back",
        operate: "back"
      },
      {
        text: " "
      },
      {
        text: "搜索",
        operate: "search",
        zhText: "搜索",
        enText: "search",
        zhConfirmText: "确认",
        enConfirmText: "Confirm"
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
        zhText: "删除",
        enText: "delete",
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
        text: "@"
      }
    ],
    [
      {
        text: "/"
      },
      {
        text: "返回",
        zhText: "返回",
        enText: "back",
        operate: "back"
      },
      {
        text: 0
      },
      {
        text: " "
      },
      {
        text: "搜索",
        zhText: "搜索",
        enText: "search"
      }
    ]
  ],
};
