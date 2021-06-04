export default{
   "float":(text,decimal=2)=>{
    let reg = /^[0-9]+.?[0-9]*$/;
   let t=String(text);
   if(!isNaN(Number(decimal))&&decimal>0){
      let decimalNumber=t.split(".")[1];
      console.log("decimalNumber.length",decimalNumber,"decimal",decimal)
      if(decimalNumber&&decimalNumber.length>decimal){
        
         return false;
      }
      else{
         return reg.test(t);
      }
   }
   else{
      return false;
   }
    
    
   },
   "int":(text)=>{
      return /^[0-9]*$/.test(text);
   },
   "cn":(text)=>{
     //支持中文和中文符号"·"
    let reg = new RegExp(
      "^([\u4E00-\u9FFF]|·)+$",
      "g"
    );
    return reg.test(text);
   },
   "en":(text)=>{
      return /^[A-Za-z]+$/.test(text)
   }
}
