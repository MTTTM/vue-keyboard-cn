import { getFullPingMatchObjKey } from "./tools.js";
const localStoreKey = "vue-keyboard-cn-store";
/**
 * 存储的格式入:
 * {
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

export const getItem=()=>{
  let store= localStorage.getItem(localStoreKey);
  try{
    store=JSON.parse(store);
  }catch(e){
    store={};
  }
  return store?store:{};
}
export const setItem=(obj={})=>{
  let jsonStr="";
  try{
    jsonStr=JSON.stringify(obj);
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