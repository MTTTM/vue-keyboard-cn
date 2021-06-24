<template>
  <div v-horizontal-screen="obj" class="demo-wrap">
    <div class="inner-wrap" id="innerWrap">
      <h1>props allowEnter</h1>

      <h2>default false</h2>
      <p v-html="mixValue"></p>
      <ky-input
        v-model="mixValue"
        scrollWrap="#innerWrap"
        placeholder="Any string"
        :rotate="route"
      />

      <h2>true</h2>
      <p v-html="mixValue"></p>
      <ky-input
        v-model="mixValue"
        placeholder="Any string"
        scrollWrap="#innerWrap"
        :rotate="route"
      />
      <key-board :emojiMap="emoji" :isHscreenApp="true" />
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { person, hearts, symbo } from "../dev/emojiImages.js";
const route = -90;
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
      route: route,
      obj: {
        width: 2001,
        height: 1125,
        cssVar: "hs-var",
        times: 3,
        rotate: -90,
        adaptedCallback: "adaptedCallback", //Replace  window’s event hsAdapt
      },
    };
  },
  methods: {
    submitFn(val) {
      console.log("input 的submit事件", val);
    },
    showStatus(data) {
      console.log("监听键盘显示隐藏", data);
    },
    inputFn({ el, value }) {
      console.log("input", el, value);
    },
    focusFn({ el, value }) {
      console.log("focus", el, value);
    },
    blurFn({ el, value }) {
      console.log("blur", el, value);
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-wrap {
  position: absolute;
  overflow: auto;
  left: 0;
  top: 0;
}
.inner-wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: absolute;
  z-index: 2;
  li {
    &:nth-child(odd) {
      background: pink;
    }
  }
}
</style>
