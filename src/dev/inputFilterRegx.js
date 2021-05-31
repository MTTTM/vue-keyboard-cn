export default{
   "float":(text,decimal=2)=>{
    let reg = /^[0-9]+.?[0-9]*$/;
    if (decimal && !isNaN(Number(decimal))) {
      reg = new RegExp(`^[0-9]+.+[0-9]{${decimal}}$`, "g");
    }
    let t=String(text);
    return reg.test(t);
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
