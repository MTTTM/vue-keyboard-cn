/**
 * 查找一个字符串中所有子串的位置
 * @param {*} str 
 * @param {*} subStr 
 * @returns 
 */
export const getAllIndex=(str,subStr)=>{
  var positions = new Array();
  function searchSubStr(str,subStr){
      var pos = str.indexOf(subStr);
      while(pos>-1){
          positions.push(pos);
          pos = str.indexOf(subStr,pos+1);
      }
  }
  searchSubStr(str,subStr);
  return positions;
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
   //遍历词库的key，得到可能存在的分词组合,
   //如果当前输入的拼音有对应山的，返回它在字符串中的索引index，否则为-1
   for (let i = 0; i < objKeys.length - 1; i++) {
     let item = objKeys[i];
     let indexArr = getAllIndex(pingyingStr, item);
     indexArr.forEach((elIndex) => {
       if(elIndex>-1){
        matchResult.push({
          index: elIndex,
          key: item,
        });
       }
      
     });
   }
   //过滤结果集中不符合条件的元素
  // matchResult = matchResult.filter((el) => el.index != -1);
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
 * 解析字符串为数组
 * @param {*} str 
 * @returns 
 */
export const splitStringToArray=(str)=>{
  if(String(str).length==1){
    return [String(str)];
  }
  var tmpArr = str.split("");
  var endArr = [];
  var tmpStr = "";
  var findFlash = false;
  for (let i = 0; i < tmpArr.length; i++) {
    let item = tmpArr[i];
    if (item == "<") {
      findFlash = true;
    } else if (!findFlash) {
      endArr.push(item);
    }

    if (findFlash) {
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
// /**
//  * 计算 解析字符串后的某个数组元素的长度
//  * @param {*} text 
//  */
// export const computedItemLen=(text)=>{
//    if(/<[^>]+>/g.test(text)){
//     return 1;
//    }
// }