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