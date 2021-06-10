import Home from '../demo/index';
import Type from "../demo/type"
import BreakWrap from "../demo/breakWrap"
import AdaptiveHeight from "../demo/adaptiveHeight"
import EventCom from "../demo//event"
import DisabledInputUpdateMixKeyBoardLang from "../demo/disabledInputUpdateMixKeyBoardLang.vue"
import canSwitchOtherBoard from "../demo/canSwitchOtherBoard"
import showFixedInput from "../demo/showFixedInput"
export default [
  {
    path: '/',  // 重定向到home页面
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path:"/type",
    component:Type
  },
  {
    path:"/breakwrap",
    component:BreakWrap
  },
  {
    path:"/adaptiveHeight",
    component:AdaptiveHeight
  },{
    path:"/event",
    component:EventCom
  },
  {
    path:"/disabledInputUpdateMixKeyBoardLang",
    component:DisabledInputUpdateMixKeyBoardLang
  },
  {
    path:"/canSwitchOtherBoard",
    component:canSwitchOtherBoard
  },

  {
    path:"/showFixedInput",
    component:showFixedInput
  },
  
  
]
