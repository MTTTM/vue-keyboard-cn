/**
 * 查找字符串在字符中出现的位置
 * @param {*} str 
 * @param {*} subStr 
 * @returns Array
 */
export const getIndexInArray=(str,subStr)=>{
  var positions = new Array();
      var pos = str.indexOf(subStr);
        if(pos>-1){
          positions.push({
            index:pos,
            text:subStr
          });
        }
  return positions;
}

function matchPinyin(pinyin="",objKeys=[],matchResult){
  console.log('受到的pingying',pinyin)
  //遍历词库的key，得到可能存在的分词组合,
    for (let i = 0; i < objKeys.length; i++) {
      let item = objKeys[i];
      let indexArr = getIndexInArray(pinyin, item);
      if(indexArr[0]){
        matchResult.push({
          index: indexArr[0].index,
          key: item,
        });
      }
      let validStr=pinyin.replace("_","");
      if(indexArr[0]&&indexArr[0].index>-1&&validStr.length){
        let arr=pinyin.split("");
        let index=indexArr[0].index;
        let len=indexArr[0].text.length;
        //直接把匹配到的字符串替换为_
        for(let i=index;i<(index+len);i++){
          arr[i]="_";
        }
        let endStr=arr.join("");
        // console.log("pinyinfsadfsdfdfsd",pinyin,"new",endStr)
        matchPinyin(endStr,objKeys,matchResult)
        break;
      }
    }
}
/**
 * 词拼音在用户输入的拼音之中，分词
 * @param {*} pingyingStr 
 * @param {*} objKeys 
 * @returns 
 */
 
export const getPingMatchObjKey=(pingyingStr="",objKeys=[])=>{
   //如果没有匹配，就需要做分词处理
   let matchResult = [];
   matchPinyin(pingyingStr,objKeys,matchResult);
   matchResult=matchResult.sort((a,b)=>a.index-b.index)
  console.log("匹配到的词",matchResult)
   return matchResult;
}
/**
 * 历史输入记录的key和用户输入完全等同
 * @param {*} pingyingStr 
 * @param {*} objKeys 
 * @returns 
 */
 export const getFullPingMatchObjKey=(pingyingStr="",objKeys=[])=>{
  //如果没有匹配，就需要做分词处理
  let matchResult = [];
  //遍历词库的key，得到可能存在的分词组合,
  //如果当前输入的拼音有对应山的，返回它在字符串中的索引index，否则为-1
  
  for (let i = 0; i < objKeys.length; i++) {
    let item = objKeys[i];
    if(item===pingyingStr){
      matchResult.push({
        index: 0,
        key: item,
      });
    }
  }
  return matchResult;
}
/**
 * 包裹单个字符串元素
 */
export const wrapStringSingleItem=(str)=>{
  return `<span class="vue-keyboard-text-item"  tabindex="0">${str}</span>`;
}
/**
 * 解析字符串为数组
 * @param {*} str 
 * @params {boolean} alertEnter
 * @returns 
 */
export const splitStringToArray=(str,alertEnter=false)=>{
  if(String(str).length==1){
    return [wrapStringSingleItem(str)];
  }
  var tmpArr = str.split("");
  var endArr = [];
  var tmpStr = "";
  var findFlash = false;
  var findEnterStr=false;//换行符号，回车符发现
  for (let i = 0; i < tmpArr.length; i++) {
    let item = tmpArr[i];
    //图片标签处理
    if (item == "<"&&tmpArr[i+1]=="i") {
      findFlash = true;
    } 
    //匹配换行符  \r  \n 或者 
    //\r\n,\r \n 会被split当做一个字符处理
    else if(item=="\r"||item=="\n"){
      findEnterStr=true;
      if(tmpArr[i+1]=="\n"){
        if(item==="\n"){
          if(alertEnter){
            endArr.push("<br/>");
          }
          else{
            endArr.push(wrapStringSingleItem(" "));
          }
          
          findEnterStr=false;
          tmpStr = "";
        }
      }
      else{
        if(alertEnter){
          endArr.push("<br/>");
        }
        else{
          endArr.push(wrapStringSingleItem(" "));
        }
          findEnterStr=false;
          tmpStr = "";
      }
    }
    else if (!findFlash&&!findEnterStr) {
      endArr.push(wrapStringSingleItem(item));
    }

    if (findFlash||findEnterStr) {
      tmpStr += item;
    }
    if (tmpArr[i - 1] && tmpArr[i - 1] == "/" && item == ">") {
      endArr.push(tmpStr);
      findFlash = false;
      tmpStr = "";
    }
  }
  return endArr;
}
/**
 * 获取dom在父级下的索引
 * @param {*} childElement 
 * @returns number
 */
export const getElementIndexOnParent=(childElement)=>{
  var parentNode =childElement.parentNode.childNodes;
  var childNodes=[];
  for(var i=0; i<parentNode.length;i++){
    let item=parentNode[i];
    //排除文本节点
    if(item.tagName&&item.nodeName !== "#text"){
      childNodes.push(item);
    }
  }
  return childNodes.indexOf(childElement);
      
}
/**
 * 移除字符串里面的html标签，留下html标签里面的文字
 * @param {*} labelStr 
 * @returns 
 */
export const labelStringRemoveLabel=(labelStr="")=>{
  let t=labelStr.replace(/<br\/>/ig,"\r\n");
  return t.replace(/<[^>]+>/g,"")
}
/**
 * 移除字符串里面的html标签(除了键盘自定义的img标签)
 * @param {*} labelStr 
 * @returns 
 */
export const labelStringRemoveLabelExceptImg=(labelStr="")=>{
  let t=labelStr.replace(/(<br(\/)?>)/ig,"\r\n");
  t=t.replace(/<[^(img)][^>]+>/g,"");
  return t;
}
/**
 * 提供uuid
 * @returns 
 */
 export const uuid=()=>{
  function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}