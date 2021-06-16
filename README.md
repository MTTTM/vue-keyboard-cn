# vue-keyboard-cn
- Provide custom input elements
- Provide Chinese input keyboard
- Provide English input keyboard
- Provide numeric input keyboard
- Only supports mobile web pages
- [demo](https://mtttm.github.io/vue-keyboard-cn/#/home)

## Installation

```javascript
 
 npm i vue-keyboard-cn

```

### Usage

***

#### main.js

```javascript
import {kyInput,keyBoard} from "vue-keyboard-cn";
Vue.component("ky-input",kyInput)
Vue.component("key-board",keyBoard)

```

#### demo.vue

```javascript


<template>
  <div>
    <ky-input v-model="mixValue" placeholder="Any string"/>
    <key-board :emojiMap="emoji" />
  </div>
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

### keyBoard
| key            | desc                                                                     | default  | required |
| -------------- | ------------------------------------------------------------------------ | -------- | -------- |
| emojiMap          | Emoji data  [reference](https://github.com/MTTTM/vue-keyboard-cn/blob/main/src/dev/emojiImages.js])                                                   | --      | FALSE     |
| disabledInputUpdateMixKeyBoardLang | Prohibit the input component from switching input methods  | FALSE       | FALSE     |
| keyBoardMaps         | Keyboard table of contents [reference](https://github.com/MTTTM/vue-keyboard-cn/blob/main/src/dev/boardMaps.js)                                                          | object | FALSE    |
| hideHead          |  hide top tab header                                                                   | FALSE      | FALSE     |


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

