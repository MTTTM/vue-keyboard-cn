
let isScrolledToBottom = (dom) => dom.scrollHeight <= (dom.scrollTop + dom.offsetHeight);
let isScrolledToTop = (dom) => dom.scrollTop === 0;
var ua = navigator.userAgent.toLowerCase();
let isIpad = ua.match(/ipad/i) == "ipad"
/**
 * @params dom {dom}
 * @params swipeDir {string} top|bottom 手指滑动方向
 * **/
function disabledDefault(dom, swipeDir = "moveToTop") {
  console.log("dir", swipeDir, "isScrolledToTop", isScrolledToTop(dom), 'isScrolledToBottom', isScrolledToBottom(dom))
  console.log("isScrollBottom", dom.scrollHeight, (dom.scrollTop + dom.offsetHeight))
  if (swipeDir == "moveToBottom" && isScrolledToTop(dom)) {
    return true;
  }
  else if (swipeDir == "moveToTop" && isScrolledToBottom(dom)) {
    return true;
  }
  else {
    return false;
  }
}
function removeDocumentStartEvent(el) {
  el.removeEventListener("touchstart", el.$documentTouchStart);
  el.removeEventListener("mousemove", el.$movefunction)
  el.removeEventListener("mouseup", el.$upFunction)
}
/**
 * 
 * @param {*} dom  model scroll dom 
 */
export const disabledBodyScroll = function (dom, binding) {
  let rotate = binding.value;
  let status = binding.arg === 'disabled' ? 'disabled' : 'working';
  console.log("status", status)
  let startY = 0;
  let startX = 0;
  function fixEvent(e) {
    let position = {};
    if (e.targetTouches && e.targetTouches[0]) {
      // var rect = dom.getBoundingClientRect();
      var x = e.targetTouches[0].pageX //- rect.left;
      var y = e.targetTouches[0].pageY// - rect.top;
      position = {
        offsetX: x,
        offsetY: y,
        e: e
      }
    }
    else {
      position = {
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        e: e
      }
    }
    return position;
  }
  function movefunction(e) {
    e.stopPropagation();
    let position = fixEvent(e);
    let disY = position.offsetY - startY;
    let disX = position.offsetX - startX;
    //dir是手指滑动方向
    let dir = disY < 0 ? "moveToTop" : "moveToBottom";
    console.log("rotate", rotate)
    //一定要画图，或者看了demo再确定
    if (rotate == 90) {
      dir = disX > 0 ? "moveToTop" : "moveToBottom";
      console.log("90")
    }
    else if (rotate == -90) {
      console.log("-90")
      dir = disX < 0 ? "moveToTop" : "moveToBottom";
    }
    let disabled = disabledDefault(dom, dir);
    console.log("dir!!!!====", dir, "disY", disY, "disabled", disabled)
    //status为working情况下才考虑是否执行
    if (status === 'working' && disabled && e.cancelable) {
      e.preventDefault();
    }

  }
  function upFunction(e) {
    e.stopPropagation();
    dom.removeEventListener("mousemove", dom.$movefunction)
    dom.removeEventListener("mouseup", dom.$upFunction)
  }
  function documentTouchStart(e) {
    e.stopPropagation();

    //It needs to grab the priority of the scrollable body at ipad
    //其实就这一个步骤就可以通过主动触发滚动元素的滚动，来阻止触发外部滚动
    // if (dom && dom.style && dom.style.display !== "none" && scrollOnePxWhenTouch) {
    //   if (isScrolledToBottom(dom)) {
    //     dom.scrollBy(0, -1)
    //   }
    //   else if (isScrolledToTop(dom)) {
    //     dom.scrollBy(0, 1)
    //   }
    // }
    let position = fixEvent(e);
    startY = position.offsetY;
    startX = position.offsetX;
    dom.addEventListener("touchmove", dom.$movefunction, false)
    dom.addEventListener("touchend", dom.$upFunction, false)
  }
  dom.$movefunction = movefunction;
  dom.$upFunction = upFunction;
  dom.$documentTouchStart = documentTouchStart
  dom.addEventListener("touchstart", dom.$documentTouchStart, false);
}
export const directive = {
  bind: disabledBodyScroll,//v2
  beforeMount: disabledBodyScroll,//v3
  unbind: removeDocumentStartEvent,//v2
  unmounted: removeDocumentStartEvent//v3
}