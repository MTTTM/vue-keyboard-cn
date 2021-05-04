<template>
  <div id="app">
    <!-- <Keyboard :value="value" type="number" /> -->
    <!-- <p>{{ value }}</p> -->
    <ky-input v-model="value" />
    <key-board :value="value" />
  </div>
</template>

<script>
// import Keyboard from "./index";
export default {
  name: "App",
  // components: {
  //   Keyboard,
  // },
  data() {
    return {
      value:
        "123123123123123123123123123123123123123123123123123euwrweirewr456euwrweirewr456euwrweirewr456euwrweirewr456euwrweirewr456",
    };
  },
};
</script>

<style>
</style>
