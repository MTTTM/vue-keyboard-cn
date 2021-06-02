
import EventKeys from "./eventKeys";
import {labelStringRemoveLabelExceptImg} from "./tools.js"
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
      if (Array.isArray(storeParse)) {
        copyTextArray = storeParse.filter(item=>item);
      } 
    }
    
  } catch (e) {
    console.error("解析复制列表不报错",e)
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
 * 复制的事件回调(监听原生,或非原生)
 * 如果内容已存在，就替换到第一个
 * @param {*} str 
 */
export const onNaticeCopyEvent=(strx)=>{
  //原生复制的地方就没有携带标签，不知道为何以前不是这样的
  //这样也不需要考虑自定义input的·自定义光标会被复制到·
  let str=labelStringRemoveLabelExceptImg(strx);
  if(!str){
    return;
  }
  let copylist=getCopyLocalStorage();
  copylist=copylist.filter(item=>item!=""&&item!=str);
  copylist.unshift(str);
  saveCopyList(copylist);
}
const copyToClipboard = str => {
  return new Promise((resolve)=>{
    if(!navigator.clipboard||!navigator.clipboard.writeText){
      resolve(false);
    }
    else{
      navigator.clipboard.writeText(str).then(function() {
        resolve({text:str,suss:true});
      }, function() {
        resolve(false);
      });
    }
  })
};
/**
 * 用原生复制功能复制字符串
 * @param {*} str 
 * @returns bool
 */
export const nativeCopyString=async (str)=>{
  //未来兼容处理了
  if(typeof document.execCommand!=="function"){
     return  copyToClipboard(str);
   }
  else{
    const input = document.createElement("input");
    input.readOnly = 'readonly';
    input.value = str;
    input.style.width="1px";
    input.style.height="1px";
    input.style.opacity=0;
    input.style.position="absolute";
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    var t=document.execCommand('copy');
    document.body.removeChild(input);
    return Promise.resolve(t);
  }

}