export default{
   "float":(text,decimal=2)=>{
    let reg = /^[0-9]+.?[0-9]*$/;
    if (decimal && !isNaN(Number(decimal))) {
      reg = new RegExp(`^[0-9]+.?[0-9]{0,${decimal}}$`, "g");
    }
    return reg.test(`${text}`);
   },
   "int":(text)=>{
      return /^[0-9]*$/.test(text);
   },
   "cn":(text)=>{
     /* [\u4E00-\u9FFF] 用于判断汉字
      * [\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\uff01\u3010\u3011\uffe5]
      * 用于判断中文标点 。；，：“”（）、？《》！【】￥
      * 可以查询对应的unicode码
      *原文链接：https://blog.csdn.net/TheJormangund/article/details/107379449
    */
    let reg = new RegExp(
      "^([\u4E00-\u9FFF]|[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\uff01\u3010\u3011\uffe5])+$",
      "g"
    );
    return reg.test(text);
   },
   "en":(text)=>{
      return /^[A-Za-z]+$/.test(text)
   }
}
