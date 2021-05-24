//控制贯标的位置
export const cursorStr='<span class="key-board-flash"></span>';//光标标签
export const getNoCursorArr=(arr)=>arr.filter(item=>item!=cursorStr);//获取灭有光标的数组
/**
 *  光标移动到第一个
 * @param {*} arr 
 * @returns 
 */
 const first=(arr=[])=>{
  arr.unshift(cursorStr);
  return {
    index:0,
    arr:arr
  }
}
/**
 * 光标移动到最后
 * @param {*} arr 
 * @returns 
 */
const last=(arr=[])=>{
  if(arr[arr.lenght-1]==cursorStr){
    return {
      index:arr.length-1,
      arr
    }
  }
  arr.push(cursorStr);
  return {
    index:arr.length-1,
    arr:arr
  }
}
/**
 * 光标移动到指定位置
 * @param {*} arr 
 * @param {*} targetIndex 
 * @returns 
 */
export const moveTo=(arr=[],targetIndex)=>{
  let filterCursorArr=getNoCursorArr(arr);
  filterCursorArr.splice(targetIndex,0,cursorStr)
  return {
    index:targetIndex,
    arr:filterCursorArr
  }
}
/**
 * 这里的targetIndex没有移除光标的
 * @param {*} arr 
 * @param {*} dirStr left|right|top|bottom
 * @returns 
 */
export const moveToFn=(arr=[],dirStr="bottom")=>{
  let filterCursorArr=getNoCursorArr(arr);
  if(dirStr=="top"){
    return first(filterCursorArr)
  }
  else if(dirStr=="bottom"){
    return last(filterCursorArr)
  }
  else{
    //这是光标位于东时候的位置
    let currCursorIndex=arr.findIndex(item=>item==cursorStr);
    let targetIndex=currCursorIndex-1;
    if(dirStr=="left"){
      if(targetIndex<0){
        return {};
      }
      else{
        
        return moveTo(filterCursorArr,targetIndex);
      }
      
    }
    else if(dirStr=="right"){
      let targetIndex=currCursorIndex+1;
      if(targetIndex>arr.length-1){
        return {};
      }
      else{
        
        return moveTo(filterCursorArr,targetIndex);
      }
    }
    return moveTo(filterCursorArr,dirStr);
  }
}

