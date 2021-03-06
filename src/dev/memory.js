import { getFullPingMatchObjKey } from "./tools.js";
const localStoreKey = "vue-keyboard-cn-store";
const clearTimeString="__$lastClearTime";//保存`清除热度小于2的词的时间戳`key
/**
 * 返回清除超过7天并且热度小于2的词，后返回最新结果
 * @param {*} objx 
 * @returns 
 */
const clearMemory=(objx={})=>{
    let obj=objx?objx:{}
    //如果没有清除时间
    if(!obj[clearTimeString]){
      obj[clearTimeString]=new Date().getTime();
    }
    else if(obj[clearTimeString]){
      try{
        //距离上一次清除热度小于2的时间间隔超过7天
        if(new Date().getTime()-Number(obj[clearTimeString])>(86400*7)){
          for(let key in obj){
            //因为__$lastClearTime，对应的是时间戳，不用处理
            if(Array.isArray(obj[key])){
              obj[key]=obj[key].filter(item=>item.order>=2);
              
            }
          }
          obj[clearTimeString]=new Date().getTime();
        }
      }catch(e){
        console.log("删除 热度小于2的词失败",e);
      }
    }
    return obj;
}
/**
 * 存储的格式入:
 * {
 *  __$lastClearTime:"时间戳",
 *  nihao:[
 *    {
 *      zh:"你好",
 *      order:1
 *      key:"nihao"
 *    },
 *   {
 *    zh:"拟好",
 *    order:2,
 *    key:"nihao"
 *   }
 *  ]
 * }
 * @returns 
 */

export const getItem=(key=undefined)=>{
  let storeStr= localStorage.getItem(localStoreKey);
  let store={};
  try{
    store=JSON.parse(storeStr);
    store=clearMemory(store);
  }catch(e){}
  let t=store?store:{};
  if(key){
    t=t[key]&&t[key].length>0?t[key]:{};
  }
  return  t;
}
const setItem=(obj={})=>{
 try{
    let jsonStr=JSON.stringify(obj);
    localStorage.setItem(localStoreKey,jsonStr)
  }catch(e){
    console.warn(e);
  }
}
/**
 * 更新拼音和中文匹配的热度
 * @param {*} pingying 
 * @param {*} zhStr 
 */
export const setPingying=(pingying="",zhStr="")=>{
  //热词长度限制
  if(!pingying||pingying.length>20){
    return;
  }
  let store=getItem();
   if(!store[pingying]){
    store[pingying]=[];
    store[pingying].push({
      key:pingying,
      zh:zhStr,
      order:0//热度,每次用户输入都增加1
    })
   }
   else{
     let index=store[pingying].findIndex(item=>item.key==pingying&&item.zh==zhStr);
     if(index==-1){
      store[pingying].push({
        key:pingying,
        zh:zhStr,
        order:0//热度,每次用户输入都增加1
      })
     }
     else{
      store[pingying][index].order+=1;
     }
   }
   setItem(store)
}
/**
 * 根据输入的拼音，获取可能匹配的词
 * @param {*} pingyingStr 
 */
export const matchHotPingying=(pingyingStr)=>{
  let obj=getItem();
  let getStore=Object.keys(obj);
  let arr=getFullPingMatchObjKey(pingyingStr,getStore)[0];
  if(arr&&arr.key&&obj[arr.key]){
    return obj[arr.key].sort((a,b)=>b.order-a.order).slice(0,3);//只返回最热的三条
  }
  else{
    return []
  }
}