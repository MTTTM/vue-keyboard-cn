/**
 * 永久记录大小写
 * @returns 
 */
const localStoreKey = "vue-keyboard-cn-lowercase";
export const getCaseItem=()=>{
  let store= localStorage.getItem(localStoreKey);
  return store==="lowercase"?"lowercase":"capitalize";
}
export const setCaseItem=(index=0)=>{
  let obj=["capitalize","lowercase"];
  let t=obj[index]?obj[index]:obj[0];
  localStorage.setItem(localStoreKey,t);
}