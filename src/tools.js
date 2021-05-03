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
 * 获取
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
       matchResult.push({
         index: elIndex,
         key: item,
       });
     });
   }
   //过滤结果集中不符合条件的元素
   matchResult = matchResult.filter((el) => el.index != -1);
   return matchResult;
}