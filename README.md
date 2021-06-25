# vue-keyboard-cn
- Provide custom input elements
- Provide Chinese input keyboard
- Provide English input keyboard
- Provide numeric input keyboard
- Only supports mobile web pages
- Friendly to horizontal screen apps
- [demo](https://mtttm.github.io/vue-keyboard-cn/#/home)
- [中文wiki](https://github.com/MTTTM/vue-keyboard-cn/wiki)

## Installation

```javascript
 
 npm i vue-keyboard-cn

```

### Usage

***

#### main.js

```javascript
import { KyInput, KyBoard,KeyboardAwareScrollView } from "vue-keyboard-cn";
import "vue-keyboard-cn/dist/index.css"
Vue.component("ky-input",KyInput)
Vue.component("key-board",KyBoard)
Vue.component("key-board-aware-scroll-view", KeyboardAwareScrollView)

```

#### demo.vue

```javascript


<template>
  <key-board-aware-scroll-view class="inner-wrap">
    <ky-input v-model="mixValue" placeholder="Any string"/>
    <key-board :emojiMap="emoji" />
  </key-board-aware-scroll-view>
</template>

<script>
import { person, hearts, symbo } from "../dev/emojiImages.js";
export default {
  name: "App",
  data() {
    return {
      emoji: {
        person,
        hearts,
        symbo,
      },
      mixValue: `hello,world!!`,
    };
  },
};
</script>





```

## props

***

### kyInput
| key            | desc                                                                     | default  | required |
| -------------- | ------------------------------------------------------------------------ | -------- | -------- |
| type          | Any one of  [int,float,cn,en,mix]                                                      | mix      | FALSE     |
| decimal         | It will only take effect when the type is float                                       | 2       | FALSE     |
| regx         | a regular object of literal                                                             | -- | FALSE    |
| allowEnter          | Can enter                                                                       | FALSE      | FALSE     |
| keyBoard    | Keyboard component $ref                                                                 | --     | FALSE    |
| canSwitchOtherBoard | Can switch other keyboards                                                       | TRUE | FALSE    |
| inputLang    | Keyboard display input method, cn or en can be selected                               | cn    | FALSE    |
| showFixedInput    | Whether to display the input box fixed at the bottom of the keyboard   -    | FALSE     | FALSE    |
| placeholder    | placeholder Text                                                              | ---     | FALSE    |
| docBodyAutoScroll    | Whether to trigger the body to scroll, let the input enter the visual area       | TRUE     | FALSE    |
| scrollWrap    | Selector for scrollable dom container, replace document body scroll,like "#box"，only work when you set props rotate  | --     | FALSE    |
| rotate    | Horizontal screen app rotation angle，Choose between 90 and -90.Only for horizontal screen app  | --     | FALSE    |


### keyBoard
| key            | desc                                                                     | default  | required |
| -------------- | ------------------------------------------------------------------------ | -------- | -------- |
| emojiMap          | Emoji data  [reference](https://github.com/MTTTM/vue-keyboard-cn/blob/main/src/dev/emojiImages.js])                                                   | --      | FALSE     |
| disabledInputUpdateMixKeyBoardLang | Prohibit the input component from switching input methods  | FALSE       | FALSE     |
| keyBoardMaps         | Keyboard table of contents [reference](https://github.com/MTTTM/vue-keyboard-cn/blob/main/src/dev/boardMaps.js)                                                          | object | FALSE    |
| hideHead          |  hide top tab header                                                                   | FALSE      | FALSE     |
| isHscreenApp      | Only need to be used for apps with horizontal screen design              | FALSE      | FALSE     |


## Events

***

### keyBoard

#### @show

- params 

``` javascript
  {
    show:true,
    el:dom
  }
```

### kyInput 

- @submit
- @input
- @blur
- @focus



## slots

***

### kyInput 

-  prepend
-  append
-  prependFixed
-  appendFixed


## Q&A

***

-  Q:The input box is covered by the keyboard 
- A:Use KeyboardAwareScrollView component to wrap form elements

- Q:Scrollable container is not a body node
- A:The input component should use the props scrollWrap.Only in this way will the input component appear in the visual area when the keyboard is processed



