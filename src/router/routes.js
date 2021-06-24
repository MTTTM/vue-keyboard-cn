import Home from '../demo/index';
import Type from "../demo/type"
import BreakWrap from "../demo/breakWrap"
import AdaptiveHeight from "../demo/adaptiveHeight"
import EventCom from "../demo//event"
import DisabledInputUpdateMixKeyBoardLang from "../demo/disabledInputUpdateMixKeyBoardLang.vue"
import canSwitchOtherBoard from "../demo/canSwitchOtherBoard"
import showFixedInput from "../demo/showFixedInput"
import InputMaxLength from "../demo/inputMaxLength.vue"
import Customkeyboard from "../demo/Customkeyboard.vue"
import noEmoji from "../demo/noEmoji.vue"
import hideHead from "../demo/hideHead.vue"
import inputDisabled from "../demo/inputDisabled.vue"
import inputSlot from "../demo/inputSlot.vue"
import horizontalScreen from "../demo/horizontalScreen"
import horizontalScreen2 from "../demo/horizontalScreen2"
export default [
  {
    path: '/',  // 重定向到home页面
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    title: "home",
  },
  {
    path: "/type",
    component: Type,
    title: "input props type",
  },
  {
    path: "/breakwrap",
    component: BreakWrap,
    title: "input breakwrap"
  },
  {
    path: "/adaptiveHeight",
    component: AdaptiveHeight,
    title: "input adaptiveHeight"
  }, {
    path: "/event",
    component: EventCom,
    title: "input event"
  },
  {
    path: "/disabledInputUpdateMixKeyBoardLang",
    component: DisabledInputUpdateMixKeyBoardLang,
    title: "keyBoard props disabledInputUpdateMixKeyBoardLang"
  },
  {
    path: "/canSwitchOtherBoard",
    component: canSwitchOtherBoard,
    title: "input props canSwitchOtherBoard"
  },

  {
    path: "/showFixedInput",
    component: showFixedInput,
    title: "input props showFixedInput"
  },
  {
    path: "/inputMaxLength",
    component: InputMaxLength,
    title: "input props inputMaxLength"
  }
  , {
    path: "/customkeyboard",
    component: Customkeyboard,
    title: "custom keyboard"
  }
  , {
    path: "/noEmoji",
    component: noEmoji,
    title: "keyboard no Emoji"
  },
  {
    path: "/hidehead",
    component: hideHead,
    title: "keyboard props hideHead"
  },
  {
    path: "/inputDisabled",
    component: inputDisabled,
    title: "input props disabled"
  }, {
    path: "/inputSlot",
    component: inputSlot,
    title: "input name slot"
  }, {
    path: "/horizontalScreen",
    component: horizontalScreen,
    title: "horizontal screen rotate 90"
  }, {
    path: "/horizontalScreen2",
    component: horizontalScreen2,
    title: "horizontal screen rotate -90"
  }
]
