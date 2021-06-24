// +----------------------------------------------------------------------
// | vue-horizontal-screen
// +----------------------------------------------------------------------
// | Copyright (c) 2021 MTTTM  https://github.com/MTTTM/vue-horizontal-screen All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( https://github.com/MTTTM/vue-horizontal-screen/blob/main/LICENSE)
// +----------------------------------------------------------------------
// | Author: MTTTM 
// +----------------------------------------------------------------------
/**
 * 用户浏览器设备是横屏还是竖屏
 * @returns {Number} 1=>横屏 0=>竖屏
 */
export const getDir = () => {
  let clientWidth = document.documentElement.clientWidth;
  let clientHeight = document.documentElement.clientHeight;
  if (clientWidth > clientHeight) {
    return 1;
  }
  else {
    return 0;
  }
}
export const isMobile = () => {
  let ua = navigator.userAgent.toLowerCase();
  let canTouch = "ontouchstart" in window && "ontouchstart" in document
  if (/mobile/i.test(ua) || canTouch) {
    return true;
  }
  else {
    return false;
  }
}
/**
*  派发自定义事件
* @param {Event} event 
* @param {*} data 
* @param {Null or Document} target 
*/
const dispatch = function (event, data, target = null) {
  event.data = {
    data
  };
  if (!target) {
    window.dispatchEvent(event);
  }
  else if (target.nodeType == 1 && typeof target['dispatchEvent'] == "function") {
    target['dispatchEvent'](event);
  }
}
//修复旋转参数
function fixParamsRotate(rotate) {
  return [90, -90].indexOf(rotate) > -1 ? rotate : 90
}
/**
* 注册事件，并且返回
* @param {String} eventName 
* @returns {Event}
*/
function createEvent(eventName) {
  let e = document.createEvent('HTMLEvents');
  e.initEvent(eventName, false, true);
  return e;
}
//事件兼容处理
function eventFix(event) {
  var touch;
  if (event.touches) {
    touch = event.targetTouches[0];
  } else {
    touch = event || window.event;
  }
  return touch;
}
//阻止默认事件
function preventDefault(el, ev) {
  if (el && el.$prevent) {
    ev.preventDefault();
  }
}
//阻止事件传播
function stopPropagation(el, ev) {
  if (el && el.$stop) {
    ev.stopPropagation();
  }
}
/**
* 鼠标按下
* @param {*} obj 
* @returns {Function}
*/
function fnStartParams(obj = {}, el) {
  return function (ev) {
    stopPropagation(el, ev);
    preventDefault(el, ev);
    var touch = eventFix(ev);
    obj.startX = touch.clientX;
    obj.startY = touch.clientY;
    obj.disX = 0;
    obj.disY = 0;
    obj.disc = obj.distance;
  }
}
/**
*鼠标移动
* @param {*} obj 
* @returns {Function}
*/
function fnMoveParams(obj = {}, el) {
  return function (ev) {
    stopPropagation(el, ev);
    preventDefault(el, ev);
    var touch = eventFix(ev);
    let curX = touch.clientX;
    let curY = touch.clientY;
    obj.disX = curX - obj.startX;
    obj.disY = curY - obj.startY;
  }
}
/**
* 鼠标放开
* @param {String} callbackType 
* @param {Object} baseInfo 
* @param {Object<Event>} eventMaps 
* @param {Function} callback  dom的自定义事件回调函数
* @param {Document} el  dom
* @returns 
*/
function fnEndParams(callbackType = "", baseInfo = {}, eventMaps = {}, callback, el) {
  //判断派发哪个事件
  let swipes = {
    win: function (swipeName, data) {
      console.log("触发事件", swipeName)
      if (eventMaps[swipeName] && eventMaps[swipeName] instanceof Event) {
        dispatch(eventMaps[swipeName], data);
      }
      else {
        console.error(`events [${swipeName}] of window is no reigstered`);
      }
    },
    doms: function (swipeName, data) {
      callback(data, el);
    },
  }
  //组合派发事件的参数
  let dispatchSwipe = function (name, baseConfig) {
    let { disY, disX, rotate, isHsAdapetAndMobile } = baseConfig;
    let isHorizontalSwipe = name == "swipeLeft" || name == "swipeRight";
    let dis = 0;
    //水平方向事件
    if (isHorizontalSwipe) {
      if (isHsAdapetAndMobile) {
        //需要做横屏适配，并且是手机设备
        dis = Math.abs(disY);

      }
      else {
        //设备竖屏，不需要做横屏适配
        dis = Math.abs(disX);
      }
    }
    else {
      //垂直方向事件
      if (isHsAdapetAndMobile) {
        //需要做横屏适配，并且是手机设备
        dis = Math.abs(disX);
      }
      else {
        //设备竖屏，不需要做横屏适配
        dis = Math.abs(disY);
      }
    }
    swipes[callbackType](name, { dis, type: name, rotate });
  }
  return function (ev) {
    stopPropagation(el, ev);
    preventDefault(el, ev);
    let { disY, distance, disX, rotate } = baseInfo;
    let dir = getDir();//1=>横屏 0=>竖屏
    let newBaseInfo = { ...baseInfo, isHsAdapetAndMobile: dir !== 1 && isMobile() }
    if (dir == 1 || !isMobile()) {
      if (disY < 0 && disY < Number(-distance)) {
        dispatchSwipe("swipeTop", newBaseInfo);
      }
      else if (disY > 0 && disY > distance) {
        dispatchSwipe("swipeBottom", newBaseInfo);
      }
      if (disX < 0 && disX < Number(-distance)) {
        dispatchSwipe("swipeLeft", newBaseInfo);
      }
      else if (disX > 0 && disX > distance) {
        dispatchSwipe("swipeRight", newBaseInfo);
      }

    } else {
      //水平事件
      let hseventName = "";
      if (disY < 0 && disY < Number(-distance)) {
        rotate === 90 ? hseventName = "swipeLeft" : hseventName = "swipeRight";
      }
      else if (disY > 0 && disY > distance) {
        rotate === 90 ? hseventName = "swipeRight" : hseventName = "swipeLeft";
      }
      hseventName && dispatchSwipe(hseventName, newBaseInfo)
      //垂直事件
      let eventName = "";
      if (disX < 0 && disX < Number(-distance)) {
        rotate === 90 ? eventName = "swipeBottom" : eventName = "swipeTop";
      }
      else if (disX > 0 && disX > distance) {
        rotate === 90 ? eventName = "swipeTop" : eventName = "swipeBottom";
      }
      eventName && dispatchSwipe(eventName, newBaseInfo)
    }



  }
}
/**
* 界面适配
* @param {object} obj 
* @param {Event || bool} e 如果是监听器触发的，就是Event，如果是主动调用的就是boolean false
*/
function hsLayoutFunc(obj = {}, e) {
  let { oneTimesWidth, oneTimesHeight, cssVar, setWrapAttr, adaptEvent, adaptedCallback, el, binding, vnode, rotate } = obj;
  let clientWidth = window.innerWidth;
  let clientHeight = window.innerHeight;
  let maxWidth = clientWidth > clientHeight ? clientWidth : clientHeight;
  let percent = maxWidth / oneTimesWidth;
  let isPc = !isMobile();
  let vm = binding.instance ? binding.instance : vnode.context;//v2是放到vnode下面的，v3改为binding下面了
  el.$hsAdapted = false;//未适配
  //如果按照宽度比例缩放后，布局高度比设备高度大，那就用高度来做比例
  if (getDir() == 1 || isPc) {
    if (percent * oneTimesHeight > clientHeight) {
      percent = clientHeight / oneTimesHeight;
    }
  }
  else {
    if (percent * oneTimesHeight > clientWidth) {
      percent = clientWidth / oneTimesHeight;
    }
  }
  document.querySelector('html').style.setProperty(`--${cssVar}`, percent);
  //在竖屏状态我们通过添加transform:rotate(90deg)，来让这个页面横过来
  if ((window.orientation == null
    || window.orientation === 180
    || window.orientation === 0
  ) && !isPc) {//竖屏状态
    el.style.webkitTransform = el.style.transform = `rotate(${rotate}deg)`;

    if (rotate == 90) {
      el.style.webkitTransformOrigin = el.style.transformOrigin = `${clientWidth / 2}px center`;
    }
    else if (rotate == -90) {
      el.style.webkitTransformOrigin = el.style.transformOrigin = ` center ${clientHeight / 2}px`;
    }

    if (setWrapAttr) {
      el.style.width = `${clientHeight}px`;
      el.style.height = `${clientWidth}px`;
    }
    //如果已经处于横屏状态就不做其他处理了
  } else if ((window.orientation === 90 || window.orientation === -90) || isPc) {//横屏状态||pc
    el.style.webkitTransform = el.style.transform = `rotate(0)`;
    if (setWrapAttr) {
      el.style.width = `${clientWidth}px`;
      el.style.height = `${clientHeight}px`;
    }
  }
  el.$hsAdapted = true;//已适配
  if (e !== false) {
    dispatch(adaptEvent, el.$hsAdapted);
    if (typeof adaptedCallback === "function") {
      adaptedCallback(el, true);
    }
    else if (vm && typeof vm[adaptedCallback] === "function") {
      vm[adaptedCallback](el, true);
    }
  }
}
function directiveBindfunction(el, binding, vnode) {
  let { cssVar, width, height, times, triggerTime, AdaptEventName, setWrapAttr, adaptedCallback, rotate } = binding.value;
  rotate = fixParamsRotate(rotate);
  if (!times) {
    times = 1;
    console.warn("times is required!!");
  }
  let oneTimesWidth = width / times;
  let oneTimesHeight = height / times;
  if (!cssVar) {
    cssVar = "hs-var";
  }
  if (!AdaptEventName) {
    AdaptEventName = "hsAdapt";
  }
  if (!triggerTime) {
    triggerTime = 1000;
  }
  let bool = 'setWrapAttr' in binding.value;
  if (!bool) {
    setWrapAttr = true;
  }
  let adaptEvent = createEvent(AdaptEventName);
  var baseInfo = { oneTimesWidth, oneTimesHeight, el, cssVar, setWrapAttr, adaptEvent, adaptedCallback, binding, vnode, rotate };
  let timer;
  el.$hsLayout = (dispatchAdatedEvent = false) => { hsLayoutFunc(baseInfo, dispatchAdatedEvent) };
  el.$delayLayout = function (dispatchAdatedEvent = false) {
    clearTimeout(timer);
    timer = setTimeout(() => hsLayoutFunc(baseInfo, dispatchAdatedEvent), triggerTime);
  };
  el.$hsAdapted = false;
  el.$hsLayout(false);
  if ("onorientationchange" in window) {
    window.removeEventListener('orientationchange', el.$delayLayout);
    window.addEventListener('orientationchange', el.$delayLayout, false);
  }
  else {
    window.removeEventListener('resize', el.$hsLayout);
    window.addEventListener('resize', el.$hsLayout, false);
  }
}
function directiveUnBind(el) {
  /**这谷歌浏览器调试监听工具有bug，如果销毁了一个绑定适配指令的节点，但是看到监听器没有解除，可以关掉调试面板再打开调试面板就可以看到了*/
  window.removeEventListener('resize', el.$hsLayout);
  window.removeEventListener('orientationchange', el.$delayLayout);
  el.$hsLayout = null;
}
function directiveForDomfunction(el, binding) {
  let callback = binding.value;
  let { stop, prevent, clockwise, counterclockwise } = binding.modifiers;
  //clockwise是否是顺时钟等于90度选项
  //counterclockwise 逆时针等于-90度
  let rotate = 90;
  //逆时间优先级最大，只要出现就是逆时针，也就旋转-90度
  if (counterclockwise) {
    rotate = -90;
  }
  else if (clockwise) {
    rotate = 90;
  }
  let baseInfo = {
    startX: 0,
    startY: 0,
    disX: 0,
    distance: 1,
    rotate,
  }
  el.$stop = stop;
  el.$prevent = prevent;
  //标记事件
  let startFn = fnStartParams(baseInfo, el);
  let moveFn = fnMoveParams(baseInfo, el);
  let endFn = fnEndParams('doms', baseInfo, {}, callback, el);
  if (isMobile()) {
    el.addEventListener("touchstart", startFn, false);
    el.addEventListener('touchmove', moveFn, false);
    el.addEventListener('touchend', endFn, false);
  }
  else {
    el.addEventListener("mousedown", startFn, false)
    el.addEventListener("mousemove", moveFn, false);
    el.addEventListener("mouseup", endFn, false);
  }
}

export const directive = {
  bind: directiveBindfunction,
  unbind: directiveUnBind,
  beforeMount: directiveBindfunction,//v3
  unmounted: directiveUnBind//v3
}
export const directiveForDom = {
  bind: directiveForDomfunction,
  beforeMount: directiveForDomfunction,//v3

}
let eventInited = false;
/**
* 
* @param {Object} obj
* @description pre  事件前缀，默认为空
* @description distance  事件距离，默认50
*/
export const event = (obj = { distance: 50, pre: '' }) => {
  if (eventInited) { return; }
  let { pre, distance, rotate } = obj;
  distance = distance ? distance : 50;
  pre = pre ? pre : "";
  rotate = fixParamsRotate(rotate);
  let baseInfo = {
    startX: 0,
    startY: 0,
    disX: 0,
    distance,
    rotate
  }
  //标记事件
  let swipeLeft = createEvent(`${pre}swipeLeft`);
  let swipeRight = createEvent(`${pre}swipeRight`);
  let swipeTop = createEvent(`${pre}swipeTop`);
  let swipeBottom = createEvent(`${pre}swipeBottom`);
  let eventMaps = { swipeLeft, swipeRight, swipeTop, swipeBottom };
  if (isMobile()) {
    window.addEventListener("touchstart", fnStartParams(baseInfo), false);
    window.addEventListener('touchmove', fnMoveParams(baseInfo), false);
    window.addEventListener('touchend', fnEndParams('win', baseInfo, eventMaps), false);
  }
  else {
    window.addEventListener("mousedown", fnStartParams(baseInfo), false)
    window.addEventListener("mousemove", fnMoveParams(baseInfo), false);
    window.addEventListener("mouseup", fnEndParams('win', baseInfo, eventMaps), false);
  }
  eventInited = true;
}