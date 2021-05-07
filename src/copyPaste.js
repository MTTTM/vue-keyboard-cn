
import EventKeys from "./eventKeys";
let hasListenerCopy=false;
let localStorageKey="vue-keyboard-copy";

/**
 * 保存复制列表
 * @param {array} array 
 * @param {boolean} isClean
 */
export const saveCopyList=(array=[],isClean=false)=>{
  console.log("saveCopyList",array);
  try{
    if(array.length||(array.length==0&&isClean)){
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(array)
      );
    }
   
  }catch(e){
    console.error(e.getMessage())
  }
  
}
/**
 * 获取复制列表，
 * @returns []
 */
 export const getCopyLocalStorage=() =>{
  let copyTextArray=[];
  try {
    let store = localStorage.getItem(localStorageKey);
    console.log("store",store)
    if (store) {
      let storeParse = JSON.parse(store);
      //
      if (Array.isArray(storeParse)) {
        copyTextArray = storeParse;
      } else {
        copyTextArray = [];
      }
    }
    else{
      copyTextArray = [];
    }
  } catch (e) {
    console.error("解析复制列表不报错",e)
    copyTextArray = [];
  }
  return  copyTextArray;
};
/**
 * 新增一条
 * 并返回结果数组
 * @param {*} str 
 * @returns []
 */
export const addOne=(str)=>{
  let copylist=getCopyLocalStorage();
  //限制只存20条
  if (copylist.length > 20) {
    copylist.pop();
  }
  console.log("copylist::",copylist)
  copylist.unshift(str);
  saveCopyList(copylist);//保存
  return getCopyLocalStorage();
}

/**
 * 监听复制
 * @param {*} vm 
 * @returns 
 */
 export const copyEventListener=(vm)=>{
  if(hasListenerCopy){return;}
  document.addEventListener("copy", ()=>{
   let copyedStr= window.getSelection(0).toString();
   if(copyedStr){
     console.log("复制",copyedStr)
    addOne(copyedStr);
    vm.$root.$emit(EventKeys["vue-keyboard-cn-natice-copy"],copyedStr);
   }
  
  });
  hasListenerCopy=true;
}
/**
 * 监听原生复制的事件回调
 * 如果内容已存在，就替换到第一个
 * @param {*} str 
 */
export const onNaticeCopyEvent=(str)=>{
  let copylist=getCopyLocalStorage();
  let index=copylist.findIndex(el=>el==str);
  let item=copylist[index];
  // if(index>-1){
  //   copylist[index]="";
  // }
  copylist.shift(item);
  copylist=copylist.filter(item=>item!="");
  saveCopyList(copylist);
}